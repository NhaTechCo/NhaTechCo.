import { setAdminPassword } from "@/lib/admin-auth";

async function main() {
  const password = process.argv[2] || "admin123";
  await setAdminPassword(password);
  console.log(`✅ Admin user created/updated with password: ${password}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
