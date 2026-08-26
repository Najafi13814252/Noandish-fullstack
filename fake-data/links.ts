import { Email, Instagram, Map, NewTwitterIcon, Phone, TelegramIcon, WhatsappIcon } from "@hugeicons/core-free-icons"

const links = ({
    quick: [
        { id: 1, title: 'صفحه اصلی' },
        { id: 2, title: 'درباره ما' },
        { id: 3, title: 'دوره‌های پیشنهادی' },
        { id: 4, title: 'مدرسین' }
    ],
    useful: [
        { id: 1, title: 'ارتباط با ما' },
        { id: 2, title: 'دوره‌ها' },
        { id: 3, title: 'دروس' },
        { id: 4, title: 'ایجاد حساب کاربری' }
    ],
    concat: [
        { id: 1, title: 'Noandish@gmail.com', icon_name: Email },
        { id: 2, title: '4567 123 9812+', icon_name: Phone },
        { id: 3, title: 'ایران', icon_name: Map }
    ],
    apps: [
        { id: 1, icon_name: Instagram },
        { id: 2, icon_name: NewTwitterIcon },
        { id: 3, icon_name: TelegramIcon },
        { id: 4, icon_name: WhatsappIcon }
    ]
})

// const mobileFooter = ([
//     { id: 1, title: 'خانه', icon_name: homeIcon },
//     { id: 2, title: 'جستجو', icon_name: searchIcon },
//     { id: 3, title: 'دسته‌بندی‌ها', icon_name: widgetIcon },
//     { id: 4, title: 'آموزش‌های من', icon_name: notebookIcon },
//     { id: 5, title: 'پروفایل', icon_name: userIcon }
// ])

export {
    links,
    // mobileFooter
}