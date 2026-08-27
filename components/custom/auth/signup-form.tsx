'use client';

import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, verifyEmailSchema } from '@/schemas/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, View, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSignUp } from '@clerk/nextjs';
import OtpInput from './otp-input';

type SignupFormProps = {
    onSuccess?: () => void;
};

export default function SignupForm({ onSuccess }: SignupFormProps) {
    const [passType, setPassType] = useState<'password' | 'text'>('password');
    const [pendingVerification, setPendingVerification] = useState(false);

    const { signUp, errors, fetchStatus } = useSignUp();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            username: "",
            password: ""
        }
    });

    const verifyForm = useForm({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            code: ""
        }
    });

    const codeValue = verifyForm.watch('code');

    const handlePassType = () => {
        if (passType === 'password') {
            setPassType('text');
        } else {
            setPassType('password');
        }
    };

    const onSubmit = async (data: z.infer<typeof signupSchema>) => {
        // نکته: signUp.password فقط emailAddress/password را رسماً در مستندات کلرک پوشش می‌دهد؛
        // firstName/lastName/username هم به همین متد پاس داده می‌شوند، در صورت خطای تایپ‌اسکریپت
        // این فیلدها را با signUp.update(...) جداگانه ست کن
        const { error } = await signUp.password({
            firstName: data.firstname,
            lastName: data.lastname,
            emailAddress: data.email,
            username: data.username,
            password: data.password,
        });

        if (error) {
            const message =
                error?.longMessage ||
                error?.message ||
                "ثبت‌نام ناموفق بود";
            toast.error(message, { style: { fontSize: '0.84rem' } });
            return;
        }

        // ارسال کد تایید به ایمیل کاربر
        await signUp.verifications.sendEmailCode();
        setPendingVerification(true);
        toast.success("کد تایید به ایمیل شما ارسال شد");
    };

    const onVerify = async (data: z.infer<typeof verifyEmailSchema>) => {
        await signUp.verifications.verifyEmailCode({ code: data.code });

        if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log(session?.currentTask);
                        return;
                    }
                    const url = decorateUrl('/');
                    if (url.startsWith('http')) {
                        window.location.href = url;
                    } else {
                        router.push(url);
                        router.refresh();
                    }
                },
            });
            toast.success("ثبت‌نام با موفقیت انجام شد");
            onSuccess?.();
            return;
        }

        console.log('Sign-up attempt not complete:', signUp);
        toast.error("کد وارد شده معتبر نیست");
        verifyForm.setValue('code', '');
    };

    // به‌محض تکمیل هر ۶ رقم، فرم به‌طور خودکار ارسال می‌شود
    useEffect(() => {
        if (codeValue?.length === 6 && fetchStatus !== 'fetching') {
            verifyForm.handleSubmit(onVerify)();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [codeValue]);

    const resendCode = async () => {
        try {
            await signUp.verifications.sendEmailCode();
            verifyForm.setValue('code', '');
            toast.success("کد تایید دوباره ارسال شد");
        } catch {
            toast.error("ارسال دوباره‌ی کد با مشکل مواجه شد");
        }
    };

    // مرحله‌ی وارد کردن کد تایید ایمیل
    if (pendingVerification) {
        return (
            <form onSubmit={verifyForm.handleSubmit(onVerify)} className="flex flex-col items-center mx-auto gap-6">
                <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
                    کد ۶ رقمی ارسال‌شده به ایمیل خود را وارد کنید
                </p>

                <Controller name='code' control={verifyForm.control} render={({ field, fieldState }) => (
                    <div className='flex flex-col w-full gap-2 items-center'>
                        <OtpInput
                            value={field.value}
                            onChange={field.onChange}
                            disabled={fetchStatus === 'fetching'}
                            error={fieldState.invalid || !!errors.fields.code}
                        />
                        {fieldState.invalid && (
                            <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
                        )}
                        {errors.fields.code && (
                            <p className='text-red-500 text-sm'>{errors.fields.code.message}</p>
                        )}
                    </div>
                )}>
                </Controller>

                <div id="clerk-captcha" />

                <Button className="w-full bg-primary dark:text-background text-lg" type="submit" disabled={fetchStatus === 'fetching'}>
                    {fetchStatus === 'fetching' ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'تایید کد'}
                </Button>

                <button
                    type="button"
                    onClick={resendCode}
                    className="text-sm text-gray-800 hover:text-sky-600 duration-200 cursor-pointer dark:text-white"
                >
                    ارسال دوباره کد
                </button>
            </form>
        );
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
                    {errors.fields.emailAddress && (
                        <p className='text-red-500 text-sm'>{errors.fields.emailAddress.message}</p>
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
                    {errors.fields.username && (
                        <p className='text-red-500 text-sm'>{errors.fields.username.message}</p>
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
                    {errors.fields.password && (
                        <p className='text-red-500 text-sm'>{errors.fields.password.message}</p>
                    )}
                </div>
            )}>
            </Controller>

            {/* این باکس برای امنیت کلرک لازم است، حذف نکنید */}
            <div id="clerk-captcha" className='absolute'/>

            <Button className="w-full bg-primary dark:text-background text-lg" type="submit" disabled={fetchStatus === 'fetching'}>
                {fetchStatus === 'fetching' ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'ثبت‌نام'}
            </Button>
        </form>
    );
}