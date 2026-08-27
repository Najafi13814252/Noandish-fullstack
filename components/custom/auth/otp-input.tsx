'use client';

import { useRef, type KeyboardEvent, type ClipboardEvent, type ChangeEvent } from 'react';

type OtpInputProps = {
    value: string;
    onChange: (value: string) => void;
    length?: number;
    disabled?: boolean;
    error?: boolean;
};

export default function OtpInput({ value, onChange, length = 6, disabled, error }: OtpInputProps) {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const digits = Array.from({ length }, (_, i) => value[i] || '');

    const focusInput = (index: number) => {
        const el = inputsRef.current[index];
        if (el) {
            el.focus();
            el.select();
        }
    };

    const setDigitAt = (index: number, digit: string) => {
        const newDigits = [...digits];
        newDigits[index] = digit;
        onChange(newDigits.join(''));
    };

    const handleChange = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, '');

        if (!raw) {
            setDigitAt(index, '');
            return;
        }

        // اگر چند رقم با هم وارد شد (مثلا از کیبورد پیشنهادی موبایل)، در باکس‌های بعدی هم پخش می‌شود
        const chars = raw.split('');
        const newDigits = [...digits];
        let cursor = index;
        for (const ch of chars) {
            if (cursor >= length) break;
            newDigits[cursor] = ch;
            cursor++;
        }
        onChange(newDigits.join('').slice(0, length));

        const nextIndex = Math.min(cursor, length - 1);
        focusInput(nextIndex);
    };

    const handleKeyDown = (index: number) => (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (digits[index]) {
                setDigitAt(index, '');
            } else if (index > 0) {
                setDigitAt(index - 1, '');
                focusInput(index - 1);
            }
            return;
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            focusInput(index - 1);
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            focusInput(index + 1);
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
        if (!pasted) return;
        onChange(pasted);
        focusInput(Math.min(pasted.length, length - 1));
    };

    return (
        <div dir="ltr" className="flex items-center justify-center gap-2">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => { inputsRef.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? 'one-time-code' : 'off'}
                    maxLength={1}
                    value={digit}
                    disabled={disabled}
                    onChange={handleChange(index)}
                    onKeyDown={handleKeyDown(index)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    aria-invalid={error}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-semibold rounded-lg border border-input bg-transparent outline-none focus:ring-2 focus:ring-primary transition aria-[invalid=true]:border-red-500"
                />
            ))}
        </div>
    );
}