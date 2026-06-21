import { prisma } from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

const SALT_ROUNDS = 10;

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const admin = await prisma.adminUser.findFirst({
    where: { username: "admin" }
  });

  if (!admin) {
    return false;
  }

  return compare(password, admin.passwordHash);
}

export async function setAdminPassword(password: string): Promise<void> {
  const passwordHash = await hash(password, SALT_ROUNDS);

  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: { passwordHash },
    create: {
      username: "admin",
      passwordHash
    }
  });
}

export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ ok: boolean; error?: string }> {
  if (!newPassword || newPassword.length < 6) {
    return { ok: false, error: "Mật khẩu mới phải có ít nhất 6 ký tự." };
  }

  const valid = await verifyAdminPassword(currentPassword);

  if (!valid) {
    return { ok: false, error: "Mật khẩu hiện tại không đúng." };
  }

  await setAdminPassword(newPassword);

  return { ok: true };
}
