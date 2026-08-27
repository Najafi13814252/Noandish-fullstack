'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import toast from 'react-hot-toast';

import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, View, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { useState } from 'react';

import { loginSchema } from '@/schemas/auth';
import { useSignIn } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LoginFormProps = {
  onSuccess?: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [passType, setPassType] = useState<'password' | 'text'>('password');
  // این حالت وقتی که Device Trust نیاز به تایید ایمیل داشته باشد فعال می‌شود
  const [needsDeviceTrust, setNeedsDeviceTrust] = useState(false);

  // در کلرک Core 3، signIn یک آبجکت reactive است، isLoaded دیگر وجود ندارد
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  });

  const verifyForm = useForm({
    defaultValues: { code: "" }
  });

  const handlePassType = () => {
    if (passType === 'password') {
      setPassType('text');
    } else {
      setPassType('password');
    }
  };

  // مرحله‌ی نهایی: نشست جدید را فعال و کاربر را هدایت می‌کند
  const finalizeSignIn = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        // اگر تسکی روی نشست باقی مانده باشد (مثل تکمیل پروفایل و ...)
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
    toast.success("ورود با موفقیت انجام شد");
    onSuccess?.();
  };

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const { error } = await signIn.password({
      // شناسه می‌تواند ایمیل یا نام‌کاربری باشد
      identifier: data.identifier,
      password: data.password,
    });

    if (error) {
      const message =
        error?.longMessage ||
        error?.message ||
        "مشخصات کاربری(ایمیل یا نام‌کاربری) یا رمز عبور صحیح نمی‌باشد";
      toast.error(message);
      return;
    }

    if (signIn.status === 'complete') {
      await finalizeSignIn();
      return;
    }

    if (signIn.status === 'needs_second_factor') {
      // نیاز به احراز هویت دو مرحله‌ای -> باید UI مربوط به آن اضافه شود
      toast.error("این حساب نیاز به تایید دو مرحله‌ای دارد");
      return;
    }

    if (signIn.status === 'needs_client_trust') {
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (f) => f.strategy === 'email_code'
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
        setNeedsDeviceTrust(true);
        toast.success("کد تایید به ایمیل شما ارسال شد");
      }
      return;
    }

    console.log('Sign-in attempt not complete:', signIn);
    toast.error("ورود ناموفق بود");
  };

  const onVerifyDeviceTrust = async (data: { code: string }) => {
    await signIn.mfa.verifyEmailCode({ code: data.code });

    if (signIn.status === 'complete') {
      await finalizeSignIn();
      return;
    }

    toast.error("کد وارد شده معتبر نیست");
  };

  // مرحله‌ی تایید Device Trust با کد ایمیل
  if (needsDeviceTrust) {
    return (
      <form onSubmit={verifyForm.handleSubmit(onVerifyDeviceTrust)} className="flex flex-col items-center mx-auto gap-6">
        <p className="text-sm text-gray-500 dark:text-gray-300 text-center">
          برای تایید این دستگاه، کد ارسال‌شده به ایمیل خود را وارد کنید
        </p>

        <Controller name='code' control={verifyForm.control} render={({ field }) => (
          <div className='flex flex-col w-full gap-2 text-right'>
            <Input
              {...field}
              type="text"
              inputMode="numeric"
              placeholder="کد تایید"
              className="text-center tracking-widest"
            />
            {errors.fields.code && (
              <p className='text-red-500 text-sm'>{errors.fields.code.message}</p>
            )}
          </div>
        )}>
        </Controller>

        <Button className="w-full bg-primary dark:text-background text-lg" type="submit" disabled={fetchStatus === 'fetching'}>
          {fetchStatus === 'fetching' ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'تایید کد'}
        </Button>

        <button
          type="button"
          onClick={() => signIn.mfa.sendEmailCode()}
          className="text-sm text-gray-800 hover:text-sky-600 duration-200 cursor-pointer dark:text-white"
        >
          ارسال دوباره کد
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto gap-6 bggre">

      {/* نام کاربری یا ایمیل */}
      <Controller name='identifier' control={form.control} render={({ field, fieldState }) => (
        <div className='flex flex-col w-full gap-2 text-right'>
          <Input
            aria-invalid={fieldState.invalid}
            {...field}
            type="text"
            placeholder="نام کاربری یا ایمیل"
          />
          {fieldState.invalid && (
            <p className='text-red-500 text-sm'>{fieldState.error?.message}</p>
          )}
          {errors.fields.identifier && (
            <p className='text-red-500 text-sm'>{errors.fields.identifier.message}</p>
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

      <Button className="w-full bg-primary dark:text-background text-lg" type="submit" disabled={fetchStatus === 'fetching'}>
        {fetchStatus === 'fetching' ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'ورود'}
      </Button>
    </form >
  );
}