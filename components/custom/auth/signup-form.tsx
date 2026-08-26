'use client';

import { Controller, useForm } from 'react-hook-form';
import { useState, useTransition } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
// import { signupAction } from '@/actions/auth-action';
// import toast from 'react-hot-toast';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, View, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignupForm() {
    const [passType, setPassType] = useState<'password' | 'text'>('password')

    const [isPending, startTransition] = useTransition()

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: ""
        }
    })

    const onSubmit = (data: z.infer<typeof signupSchema>) => {
        // startTransition(async () => {
        //     try {
        //         const result = await signupAction(data)
        //         if (!result?.success) {
        //             toast.error(result?.message || '', {
        //                 style: {
        //                     fontSize: '0.84rem'
        //                 }
        //             })
        //         } else {
        //             toast.success("ثبت‌نام با موفقیت انجام شد")
        //             onSuccess?.()
        //             router.push("/")
        //         }
        //     } catch {
        //         toast.error("ثبت‌نام ناموفق بود")
        //     }
        // })
    }

    const handlePassType = () => {
        if (passType === 'password') {
            setPassType('text')
        } else {
            setPassType('password')
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto gap-6">

            <div className='flex gap-2 items-center'>
                {/* نام */}
                <Controller name='firstname' control={form.control} render={({ field, fieldState }) => (
                    <div className='flex flex-col w-full gap-2 text-right'>
                        <Input

                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="text"
                            placeholder="نام"
                        />
                        {fieldState.invalid && (
                            <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                        )}
                    </div>
                )}>
                </Controller>

                {/* نام خانوادگی */}
                <Controller name='lastname' control={form.control} render={({ field, fieldState }) => (
                    <div className='flex flex-col w-full gap-2 text-right'>
                        <Input
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type="text"
                            placeholder="نام‌خانوادگی"
                        />
                        {fieldState.invalid && (
                            <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                        )}
                    </div>
                )}>
                </Controller>
            </div>


            {/* ایمیل */}
            <Controller name='email' control={form.control} render={({ field, fieldState }) => (
                <div className='flex flex-col w-full gap-2 text-right'>
                    <Input
                        className='w-full'
                        aria-invalid={fieldState.invalid}
                        {...field}
                        type="text"
                        placeholder="ایمیل"
                    />
                    {fieldState.invalid && (
                        <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                    )}
                </div>
            )}>
            </Controller>


            {/* نام کاربری */}
            <Controller name='username' control={form.control} render={({ field, fieldState }) => (
                <div className='flex flex-col w-full gap-2 text-right'>
                    <Input
                        className='w-full'
                        aria-invalid={fieldState.invalid}
                        {...field}
                        type="text"
                        placeholder="نام‌کاربری"
                    />
                    {fieldState.invalid && (
                        <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                    )}
                </div>
            )}>
            </Controller>


            {/* رمز عبور */}
            <Controller name='password' control={form.control} render={({ field, fieldState }) => (
                <div className='w-full relative flex flex-col gap-2 text-right'>
                    <div className="flex items-center justify-between">
                        <Input
                            aria-invalid={fieldState.invalid}
                            {...field}
                            type={passType}
                            placeholder="رمز عبور را وارد کنید"
                        />

                        <HugeiconsIcon icon={passType === 'password' ? View : ViewOffSlashIcon} className='absolute left-2 text-gray-500 text-xl cursor-pointer' onClick={handlePassType} />
                    </div>
                    {fieldState.invalid && (
                        <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                    )}
                </div>
            )}>
            </Controller>

            <Button className="w-full bg-primary dark:text-background text-lg" type="submit">
                {isPending ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'ثبت‌نام'}
            </Button>
        </form>
    );
}