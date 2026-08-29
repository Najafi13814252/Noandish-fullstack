// قرار دادن یک کاربر Clerk به‌عنوان admin
// اجرا: npx tsx init.ts [email]
// اگر ایمیلی داده نشود، از ایمیل پیش‌فرض استفاده می‌شود

import "dotenv/config";

import { createClerkClient } from "@clerk/backend";

const DEFAULT_EMAIL = "noandish.admin.test@gmail.com";

async function main() {
    const email = process.argv[2] ?? DEFAULT_EMAIL;

    const clerk = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY!,
    });

    // پیدا کردن کاربر در Clerk
    const [clerkUser] = (
        await clerk.users.getUserList({ emailAddress: [email] })
    ).data;

    if (!clerkUser) {
        console.error(`❌ User by email ${email} it was not found.`);
        process.exit(1);
    }

    // قرار دادن نقش admin در publicMetadata کاربر
    await clerk.users.updateUserMetadata(clerkUser.id, {
        publicMetadata: { role: "admin" },
    });

    console.log(
        `✅ ${email} (${clerkUser.id}) registered as admin.`
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
