import { AssignmentsIcon, CashierIcon, ConversationIcon, CorporateIcon, MarketingIcon, MentorIcon, ThreeDViewIcon } from "@hugeicons/core-free-icons";
import { IconSvgElement } from "@hugeicons/react";

// type IconType = typeof AssignmentsIcon;

type Menu = {
    id: number
    title: string
    items: string[]
    icon_name: IconSvgElement
}

export const categories: Menu[] = [
    {
        id: 1,
        title: 'رهبری و مدیریت سازمانی',
        items: [
            'مدیریت منابع انسانی',
            'رهبری تحول‌آفرین',
            'مدیریت استراتژیک',
            'تصمیم‌گیری و حل مسئله',
            'کوچینگ و منتورینگ مدیران'
        ],
        icon_name: CorporateIcon 
    },
    {
        id: 2,
        title: 'مهارت‌های نرم (Soft Skills)',
        items: [
            'هوش هیجانی در محیط کار',
            'مهارت‌های ارتباطی مؤثر',
            'مذاکره حرفه‌ای',
            'مهارت سخنرانی و ارائه',
            'مدیریت استرس و تاب‌آوری'
        ],
        icon_name: ConversationIcon
    },
    {
        id: 3,
        title: 'آموزش‌های تخصصی منابع انسانی',
        items: [
            'فرایند جذب و استخدام حرفه‌ای',
            'طراحی مسیر شغلی و انگیزشی',
            'ارزیابی عملکرد و ارائه بازخورد',
            'آموزش و توسعه کارکنان',
            'مدیریت تعارض در تیم‌ها'
        ],
        icon_name: AssignmentsIcon
    },
    {
        id: 4,
        title: 'فناوری اطلاعات و مهارت‌های دیجیتال',
        items: [
            'Excel پیشرفته برای تحلیل داده‌ها',
            'آشنایی با AI و کاربردهای آن در کسب‌وکار',
            'امنیت سایبری برای کارکنان',
            'آشنایی با ChatGPT و ابزارهای هوش مصنوعی',
            'ابزارهای مدیریت پروژه (Trello، Asana، MS Project)'
        ],
        icon_name: ThreeDViewIcon
    },
    {
        id: 5,
        title: 'بازاریابی و تبلیغات',
        items: [
            'بازاریابی دیجیتال (SEO، Google Ads، شبکه‌های اجتماعی)',
            'استراتژی محتوا و برندینگ',
            'طراحی کمپین‌های تبلیغاتی',
            'تحلیل رفتار مشتری',
            'بازاریابی ایمیلی و اتوماسیون'
        ],
        icon_name: MarketingIcon
    },
    {
        id: 6,
        title: 'فروش و ارتباط با مشتری',
        items: [
            'اصول و تکنیک‌های فروش حرفه‌ای',
            'مهارت‌های ارتباط با مشتریان سخت‌گیر',
            'مدیریت اعتراض و شکایت مشتری',
            'سیستم‌های CRM و وفاداری مشتریان',
            'فروش تلفنی و فروش حضوری مؤثر'
        ],
        icon_name: MentorIcon
    },
    {
        id: 7,
        title: 'مدیریت مالی و حسابداری',
        items: [
            'اصول حسابداری برای مدیران غیرفنی',
            'بودجه‌بندی و مدیریت هزینه‌ها',
            'تحلیل مالی و تفسیر صورت‌های مالی',
            'کنترل داخلی و گزارش‌دهی',
            'مدیریت مالی شخصی برای کارکنان'
        ],
        icon_name: CashierIcon
    }
]