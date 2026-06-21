import "server-only";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Khoa dung de xac thuc cac request admin giua frontend va backend.
 * O production bat buoc phai cau hinh BACKEND_API_KEY, neu thieu se nem loi
 * de tranh dung gia tri mac dinh yeu.
 */
export function getBackendApiKey(): string {
  const key = process.env.BACKEND_API_KEY;

  if (!key) {
    if (isProduction) {
      throw new Error(
        "BACKEND_API_KEY chua duoc cau hinh. Hay dat bien moi truong nay o production."
      );
    }
    return "admin123";
  }

  return key;
}
