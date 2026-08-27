'use client';

import Image from 'next/image';
import { useState } from 'react';
import LoginForm from './login-form';
import SignupForm from './signup-form';
import GoogleButton from './google-button';


type RegisterProps = {
    onSuccess?: () => void;
};

function Register({ onSuccess }: RegisterProps) {
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
                <LoginForm onSuccess={onSuccess} />
            ) : (
                <SignupForm onSuccess={onSuccess} />
            )}

            <div className="flex items-center gap-3 w-full my-4">
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs text-gray-400 dark:text-gray-500">یا</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
            </div>

            <GoogleButton />

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