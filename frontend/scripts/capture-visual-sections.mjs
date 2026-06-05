import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const edgePath =
  process.env.EDGE_PATH ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9333;
const outputDir = path.join(process.cwd(), "visual-checks");
const userDataDir = path.join(process.cwd(), ".edge-visual-profile");
const sections = ["top", "services", "results", "process", "contact"];
const themes = ["light", "dark"];
const viewports = [
  { name: "desktop", width: 1440, height: 1200 },
  { name: "mobile", width: 390, height: 844 }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForJson(url, attempts = 60) {
  for (let index = 0; index < attempts; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      // Browser is still starting.
    }
    await wait(250);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result);
      }
    }
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener(
      "open",
      () => {
        resolve({
          send(method, params = {}) {
            id += 1;
            socket.send(JSON.stringify({ id, method, params }));
            return new Promise((innerResolve, innerReject) => {
              pending.set(id, { resolve: innerResolve, reject: innerReject });
            });
          },
          close() {
            socket.close();
          }
        });
      },
      { once: true }
    );
    socket.addEventListener("error", reject, { once: true });
  });
}

await mkdir(outputDir, { recursive: true });
await rm(userDataDir, { recursive: true, force: true });

const browser = spawn(edgePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${userDataDir}`,
  "about:blank"
]);

try {
  await waitForJson(`http://127.0.0.1:${port}/json/version`);

  for (const theme of themes) {
    for (const viewport of viewports) {
      const target = await fetch(
        `http://127.0.0.1:${port}/json/new?about:blank`,
        { method: "PUT" }
      ).then((response) => response.json());
      const client = await connect(target.webSocketDebuggerUrl);

      await client.send("Page.enable");
      await client.send("Runtime.enable");
      await client.send("Page.addScriptToEvaluateOnNewDocument", {
        source: `try { localStorage.setItem("theme", "${theme}"); } catch {}`
      });
      await client.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-color-scheme", value: theme }]
      });
      await client.send("Emulation.setDeviceMetricsOverride", {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: 1,
        mobile: viewport.name === "mobile"
      });
      await client.send("Page.navigate", { url: "http://localhost:3000/" });
      await wait(2500);
      await client.send("Runtime.evaluate", {
        expression: "document.documentElement.style.scrollBehavior = 'auto'"
      });

      for (const section of sections) {
        const expression =
          section === "top"
            ? "window.scrollTo(0, 0)"
            : `(() => { const element = document.getElementById("${section}"); if (element) { window.scrollTo(0, Math.max(0, element.getBoundingClientRect().top + window.scrollY - 96)); } return window.scrollY; })()`;
        await client.send("Runtime.evaluate", {
          expression,
          awaitPromise: true,
          returnByValue: true
        });
        await wait(900);
        const screenshot = await client.send("Page.captureScreenshot", {
          captureBeyondViewport: false,
          format: "png"
        });
        await writeFile(
          path.join(outputDir, `${theme}-${viewport.name}-${section}-cdp.png`),
          Buffer.from(screenshot.data, "base64")
        );
      }

      client.close();
    }
  }
} finally {
  browser.kill();
}
