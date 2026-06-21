import "server-only";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Khoa dung de goi cac API admin cua backend. Chi dung phia server.
 * O production bat buoc phai cau hinh BACKEND_API_KEY.
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

/**
 * Secret dung de ky cookie phien admin.
 * O production bat buoc phai cau hinh ADMIN_SESSION_SECRET (khong dung mac dinh).
 */
export function getAdminSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret === "dev-secret") {
    if (isProduction) {
      throw new Error(
        "ADMIN_SESSION_SECRET chua duoc cau hinh dung. Hay dat mot chuoi ngau nhien dai o production."
      );
    }
    return "dev-secret";
  }

  return secret;
}
