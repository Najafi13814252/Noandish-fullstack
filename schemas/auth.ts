import { z } from 'zod'

export const loginSchema = z.object({
    identifier: z
        .string()
        .min(1, 'نام کاربری یا ایمیل را وارد کنید'),
    password: z
        .string()
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
})

export const signupSchema = z.object({
    firstname: z
        .string()
        .min(2, 'نام را وارد کنید'),
    lastname: z
        .string()
        .min(2, 'نام‌خانوادگی را وارد کنید'),
    email: z
        .string()
        .min(1, 'ایمیل را وارد کنید')
        .email('ایمیل معتبر نیست'),
    username: z
        .string()
        .min(3, 'نام‌کاربری باید حداقل ۳ کاراکتر باشد')
        .max(24, 'نام‌کاربری نباید بیشتر از ۲۴ کاراکتر باشد')
        .regex(/^[a-zA-Z0-9_]+$/, 'نام‌کاربری فقط می‌تواند شامل حروف انگلیسی، عدد و _ باشد'),
    password: z
        .string()
        .min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
})

export const verifyEmailSchema = z.object({
    code: z
        .string()
        .length(6, 'کد تایید باید ۶ رقم باشد')
        .regex(/^\d+$/, 'کد تایید فقط شامل عدد است'),
})