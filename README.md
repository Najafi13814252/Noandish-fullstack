# نواندیش | بنیاد تعالی آموزش‌های تخصصی

پلتفرم فروش دوره‌های آموزشی تخصصی نواندیش — یک فروشگاه دورهٔ آنلاین فارسی (RTL) با امکان فیلتر و جستجوی دوره‌ها، خرید با زرین‌پال، سبد خرید، علاقه‌مندی‌ها، پروفایل کاربری و پیگیری پیشرفت دروس.

## تکنولوژی‌ها

| بخش | تکنولوژی |
| --- | --- |
| فریم‌ورک | [Next.js 16](https://nextjs.org) (App Router، Turbopack) |
| زبان | TypeScript |
| دیتابیس | MySQL / MariaDB با [Prisma 7](https://www.prisma.io) |
| احراز هویت | [Clerk](https://clerk.com) (ورود با گوگل از طریق sso-callback) |
| پرداخت | درگاه زرین‌پال (حالت sandbox) |
| استایل | Tailwind CSS 4 + کامپوننت‌های shadcn-style در `components/ui` |
| آیکون‌ها | Hugeicons |
| فونت | Arad FD و Lalezar (به‌صورت local font) |

## پیش‌نیازها

- Node.js نسخهٔ 20.9 یا بالاتر
- دسترسی به یک دیتابیس MySQL / MariaDB
- حساب Clerk و کلیدهای API آن
- Merchant ID زرین‌پال (برای پرداخت)

## راه‌اندازی

### ۱. نصب وابستگی‌ها

```bash
npm install
```

### ۲. تنظیم متغیرهای محیطی

فایل `.env.example` را با نام `.env` کپی کنید و مقادیر را پر کنید:

```bash
cp .env.example .env
```

مهم‌ترین متغیرها:

- `DATABASE_URL` — رشتهٔ اتصال MySQL (الگو: `mysql://user:pass@host:port/db`)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` و `CLERK_SECRET_KEY` — کلیدهای Clerk
- `ZARINPAL_MERCHANT_ID` و `ZARINPAL_BASE_URL` — درگاه پرداخت (برای تست `https://sandbox.zarinpal.com`)
- `NEXT_PUBLIC_APP_URL` — **دامنهٔ اصلی سایت**؛ مبنای canonical، sitemap و تصاویر Open Graph است و قبل از استقرار باید به آدرس واقعی سایت تغییر کند
- `UPLOADTHING_TOKEN` — برای آپلود تصاویر دوره‌ها (UploadThing)

### ۳. دیتابیس

```bash
npx prisma migrate deploy   # اعمال migration ها
```

کلاینت Prisma به‌صورت خودکار با `npm run build` در پوشهٔ `generated/prisma` تولید می‌شود.

### ۴. اجرا در حالت توسعه

```bash
npm run dev
```

سایت روی [http://localhost:3000](http://localhost:3000) بالا می‌آید.

### ۵. ادمین

برای اضافه کردن نقش `admin` به یک کاربر Clerk:

```bash
npx tsx init.ts user@example.com
```

## اسکریپت‌ها

| دستور | توضیح |
| --- | --- |
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` | تولید Prisma Client + بیلد نهایی |
| `npm start` | اجرای بیلد نهایی |
| `npm run lint` | بررسی ESLint |
| `npx tsx init.ts [email]` | تعیین کاربر ادمین در Clerk |
| `npx tsx script.ts` | اسکریپت‌های یک‌بارمصرف داده (مثل افزودن درس نمونه) |
| `install.bat` | نصب CLI `runflare` برای تونل‌زدن به دیتابیس ریموت |

## ساختار پروژه

```
app/
  layout.tsx          # ریشه: متادیتای سراسری، فونت‌ها، provider ها، JSON-LD
  (root)/             # صفحهٔ اصلی و نتیجهٔ پرداخت
  (course)/           # فهرست دوره‌ها، صفحهٔ دوره، صفحهٔ پخش درس
  (cart)/             # سبد خرید
  (dashboard)/        # پروفایل کاربری (خریدها، علاقه‌مندی‌ها، تنظیمات)
  (auth)/             # sso-callback
  api/                # callback پرداخت زرین‌پال
  sitemap.ts          # نقشهٔ سایت (خانه، دوره‌ها، صفحات دوره)
  robots.ts           # قوانین خزنده‌ها
  manifest.ts         # PWA manifest فارسی
  icon.tsx            # فاوآیکون تولیدشده با ImageResponse
  apple-icon.tsx      # آیکون Apple touch
  opengraph-image.tsx # تصویر اشتراک‌گذاری برند
actions/              # Server Actions (سبد خرید، پرداخت)
components/
  custom/             # نوار بالا، فوتر، theme-provider، json-ld و …
  ui/                 # کامپوننت‌های پایه (shadcn)
data/                 # دسترسی به دیتابیس ("use server" — فقط سمت سرور)
lib/                  # prisma، زرین‌پال، فیلتر دوره‌ها، seo، og-image
prisma/               # schema و migration ها
generated/            # خروجی Prisma Client (تولیدی — ویرایش نکنید)
public/fonts/         # فونت‌های فارسی (woff2 برای سایت + ttf برای تصاویر OG)
```

## سئو و متادیتا

تنظیمات سئو به‌صورت متمرکز در [lib/seo.ts](lib/seo.ts) نگهداری می‌شود:

- **متادیتای سراسری** در `app/layout.tsx`: عنوان با قالب `%s | نواندیش`، توضیحات، Open Graph و Twitter Card، robots با پیش‌نمایش تصویر، `lang="fa"` و JSON-LD سازمان و وب‌سایت
- **صفحهٔ دوره**: متادیتای پویا (عنوان و توضیحات واقعی دوره، canonical، کاور دوره به‌عنوان og:image) + JSON-LD از نوع `Course` و `BreadcrumbList`
- **صفحات خصوصی** (سبد خرید، پروفایل، نتیجهٔ پرداخت) و **صفحات درس** با `noindex` از ایندکس خارج شده‌اند؛ صفحات درس canonical بدون پارامتر `?lesson=` دارند
- **`app/sitemap.ts`** فهرست دوره‌ها را از دیتابیس می‌خواند و **`app/robots.ts`** مسیرهای خصوصی را بلاک می‌کند

نکته‌های فنی این بخش:

- موتور تولید تصویر (satori) فونت woff2 را نمی‌پذیرد؛ برای `icon.tsx` و `opengraph-image.tsx` نسخهٔ **ttf** فونت‌ها در `public/fonts` استفاده می‌شود. برای تبدیل مجدد: `pip install fonttools brotli` و سپس `TTFont('x.woff2')` با `flavor = None` ذخیره شود
- ساتوری محور افقی flex را برای `direction: rtl` برعکس نمی‌کند؛ راست‌چینی تصاویر با `alignItems: flex-end` صریح اعمال شده است
- برای جلوگیری از کوئری تکراری بین صفحه و `generateMetadata`، توابع `getCourse` و `getChaptersWithLessons` در [data/courses.ts](data/courses.ts) با `React.cache` ممایز شده‌اند

## استقرار

```bash
npm run build
npm start
```

قبل از استقرار حتماً در `.env` محیط تولید:

1. `NEXT_PUBLIC_APP_URL` را به دامنهٔ واقعی (https) تغییر دهید
2. `ZARINPAL_BASE_URL` را از sandbox به آدرس اصلی زرین‌پال تغییر دهید
3. دامنهٔ سایت را در پنل Clerk به‌عنوان آدرس مجاز ثبت کنید
