import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** رنگ‌های برند برای فاوآیکون و تصاویر اشتراک‌گذاری (Open Graph) */
export const BRAND_COLORS = {
    gradientFrom: "#0e7490",
    gradientTo: "#115e59",
    accent: "#5eead4",
    white: "#ffffff",
};

// توجه: موتور تولید تصویر (satori) فقط TTF/WOFF را می‌پذیرد؛
// نسخهٔ woff2 فونت با fontTools به ttf تبدیل شده است
export function loadAradFont() {
    return readFile(join(process.cwd(), "public/fonts/AradFD-ExtraBoldDots3.ttf"));
}

export function loadAradMediumFont() {
    return readFile(join(process.cwd(), "public/fonts/AradFD-MediumDots3.ttf"));
}
