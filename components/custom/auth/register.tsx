'use client';

import Image from 'next/image';
import { useState } from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';


function Register() {
    const [mode, setMode] = useState<'login' | 'signup'>('login');

    const description = mode === 'login'
        ? 'به صفحه ورود نواندیش خوش‌ برگشتید'
        : 'به صفحه ثبت‌نام نواندیش خوش‌آمدید';

    return (
        <div className="text-center">
            <div className="w-full h-auto flex flex-col items-center my-2">
                <Image
                    src="/logo.avif"
                    width={75}
                    height={75}
                    alt="Logo"
                    priority
                    className="rounded-full"
                />
                <div className="flex flex-col gap-2 mb-4">
                    <h2 className="text-primary text-4xl font-heading">
                        {mode === 'login' ? 'ورود' : 'ثبت‌نام'}
                    </h2>
                    <p className="text-gray-500 text-lg dark:text-gray-300">
                        {description}
                    </p>
                </div>
            </div>

            {mode === 'login' ? (
                <LoginForm />
            ) : (
                <SignupForm />
            )}

            <button
                className="mt-4 text-sm text-gray-800 hover:text-sky-600 duration-200 cursor-pointer dark:text-white inline-block"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>

                {mode === 'login'
                    ? 'حساب کاربری ندارید؟ ثبت‌نام'
                    : 'حساب کاربری دارید؟ ورود'}
            </button>
        </div>
    );
};

export default Register;