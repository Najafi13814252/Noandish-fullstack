'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
// import toast from 'react-hot-toast';

import { HugeiconsIcon } from '@hugeicons/react';
import { Loading03Icon, View, ViewOffSlashIcon } from '@hugeicons/core-free-icons';
import { useState, useTransition } from 'react';

import { loginSchema } from '@/schemas/auth';
// import { loginAction } from '@/actions/auth-action';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [passType, setPassType] = useState<'password' | 'text'>('password')

  const router = useRouter()
  // const {refetchUser} = useContext(AuthContext)

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: ""
    }
  })

  const handlePassType = () => {
    if (passType === 'password') {
      setPassType('text')
    } else {
      setPassType('password')
    }
  }

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    // startTransition(async () => {
    //   try {
    //     await loginAction(data)
    //     toast.success("ورود با موفقیت انجام شد")
    //     onSuccess?.()
    //     await refetchUser()
    //     router.push("/")
    //   } catch {
    //     toast.error("مشخصات کاربری(ایمیل یا نام‌کاربری) یا رمز عبور صحیح نمی‌باشد")
    //   }
    // })
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
        {isPending ? <HugeiconsIcon icon={Loading03Icon} className='mx-auto size-5 animate-spin' /> : 'ورود'}
      </Button>
    </form >
  );
}