'use client';

import {
    useClerk,
    useSignIn,
    useSignUp,
} from '@clerk/nextjs';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SSOCallbackPage() {
    const clerk = useClerk();
    const { signIn } = useSignIn();
    const { signUp } = useSignUp();

    const router = useRouter();
    const hasRun = useRef(false);

    useEffect(() => {
        if (!clerk.loaded || hasRun.current) {
            return;
        }

        hasRun.current = true;

        const handleOAuth = async () => {
            try {
                // --------------------------------
                // Google Login
                // --------------------------------

                if (signIn.status === 'complete') {
                    await signIn.finalize({
                        navigate: ({ session, decorateUrl }) => {
                            if (session?.currentTask) {
                                console.log(
                                    'Current task:',
                                    session.currentTask
                                );
                                return;
                            }

                            const url = decorateUrl('/');

                            if (url.startsWith('http')) {
                                window.location.href = url;
                            } else {
                                router.push(url);
                            }
                        },
                    });

                    return;
                }

                // --------------------------------
                // Google Signup
                // --------------------------------

                if (signIn.isTransferable) {
                    await signUp.create({
                        transfer: true,
                    });

                    if (signUp.status === 'complete') {
                        await signUp.finalize({
                            navigate: ({ session, decorateUrl }) => {
                                if (session?.currentTask) {
                                    console.log(
                                        'Current task:',
                                        session.currentTask
                                    );
                                    return;
                                }

                                const url = decorateUrl('/');

                                if (url.startsWith('http')) {
                                    window.location.href = url;
                                } else {
                                    router.push(url);
                                }
                            },
                        });

                        return;
                    }
                }

                // --------------------------------
                // اگر SignUp از قبل complete باشد
                // --------------------------------

                if (signUp.status === 'complete') {
                    await signUp.finalize({
                        navigate: ({ session, decorateUrl }) => {
                            if (session?.currentTask) {
                                console.log(
                                    'Current task:',
                                    session.currentTask
                                );
                                return;
                            }

                            const url = decorateUrl('/');

                            if (url.startsWith('http')) {
                                window.location.href = url;
                            } else {
                                router.push(url);
                            }
                        },
                    });

                    return;
                }

                console.log('Unhandled OAuth state:', {
                    signInStatus: signIn.status,
                    signUpStatus: signUp.status,
                    signInTransferable: signIn.isTransferable,
                    signUpTransferable: signUp.isTransferable,
                    missingFields: signUp.missingFields,
                });

            } catch (error) {
                console.error(
                    'OAuth callback error:',
                    error
                );

                router.push('/');
            }
        };

        handleOAuth();

    }, [clerk, signIn, signUp, router]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div id="clerk-captcha" />

            <p className="text-gray-500">
                در حال ورود با گوگل...
            </p>
        </div>
    );
}