import z from "zod";

const usernameRegex = /^[a-zA-Z0-9_@$]{4,30}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/

export const loginSchema = z.object({
    identifier: z
        .string()
        .trim()
        .min(1, "مشخصات کاربری نمیتواند خالی باشد")
        .min(4, "مشخصات کاربری باید حداقل شامل 4 کاراکتر باشد")
        .max(30, "مشخصات کاربری باید حداکثر شامل 30 کاراکتر باشد")
        .nonempty("مشخصات کاربر نمیتواند خالی باشد")
        .superRefine((value, ctx) => {
            // amir@
            const isValidUsername = usernameRegex.test(value)
            const looksLikeEmail = value.includes(".");

            if (looksLikeEmail) {
                const isValidEmail = z.email().safeParse(value).success
                if (!isValidEmail) {
                    ctx.addIssue({
                        code: "custom",
                        message: "فرمت ایمیل صحیح نمی‌باشد"
                    })
                }
            } else {
                if (!isValidUsername) {
                    ctx.addIssue({
                        code: "custom",
                        message: "نام کاربری باید شامل حروف، اعداد، _، @ یا $ باشد"
                    })
                }
            }
        }),
    password: z
        .string()
        .trim()
        .nonempty("رمز عبور نمیتواند خالی باشد")
        .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد")
        .max(30, "رمز عبور باید حداکثر شامل 30 کاراکتر باشد")
        .regex(passwordRegex, "رمز عبور فقط باید شامل حروف انگلیسی و اعداد باشد")
})

export const signupSchema = z.object({
    firstname: z
        .string()
        .trim()
        .nonempty("نام نمیتواند خالی باشد")
        .min(2, "نام باید حداقل شامل 2 حرف باشد")
        .max(20, "نام باید حداقل شامل 20 حرف باشد"),
    lastname: z
        .string()
        .trim()
        .nonempty("نام‌خانوادگی نمیتواند خالی باشد")
        .min(2, "نام‌خانوادگی باید حداقل شامل 2 حرف باشد")
        .max(20, "نام‌خانوادگی باید حداقل شامل 20 حرف باشد"),
    email: z
        .string()
        .trim()
        .nonempty("ایمیل نمیتواند خالی باشد")
        .min(2, "ایمیل باید حداقل شامل 2 حرف باشد")
        .max(30, "ایمیل باید حداقل شامل 20 حرف باشد")
        .refine((value) => {
            return z.email().safeParse(value).success
        }, "فرمت ایمیل صحیح نمی‌باشد"),
    username: z
        .string()
        .trim()
        .nonempty("نام‌کاربری نمیتواند خالی باشد")
        .min(2, "نام‌کاربری باید حداقل شامل 2 حرف باشد")
        .max(20, "نام‌کاربری باید حداقل شامل 20 حرف باشد")
        .regex(usernameRegex, "نام کاربری باید شامل حروف، اعداد، _، @ یا $ باشد"),
    password: z
        .string()
        .trim()
        .nonempty("رمز عبور نمیتواند خالی باشد")
        .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر باشد")
        .max(30, "رمز عبور باید حداکثر شامل 30 کاراکتر باشد")
        .regex(passwordRegex, "رمز عبور فقط باید شامل حروف انگلیسی و اعداد باشد")

})