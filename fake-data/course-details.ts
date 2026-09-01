import { courseType } from "./courses"

export type lessonType = {
    id: number
    title: string
    duration: string
    /** ویدئوهایی که هنوز برای کاربر قابل تماشا نیستند */
    locked?: boolean
    videoUrl?: string
}

export type chapterType = {
    id: number
    title: string
    lessons: lessonType[]
}

export type reviewType = {
    id: number
    name: string
    rating: number
    date: string
    comment: string
}

export type teacherType = {
    name: string
    role: string
    avatar: string
    bio: string
    students: number
    courses: number
    rating: number
}

export type courseDetailType = {
    description: string
    fullDescription: string[]
    prerequisites: string[]
    language: string
    chapters: chapterType[]
    teacher: teacherType
    reviews: reviewType[]
}

const details: Record<number, courseDetailType> = {
    1: {
        description: 'در این دوره به‌صورت گام‌به‌گام با مهارت‌های توسعه فردی آشنا می‌شوید و مسیر رشد شخصی خود را آغاز می‌کنید.',
        fullDescription: [
            'توسعه فردی فرآیندی مستمر برای شناخت خود، بهبود مهارت‌ها و رسیدن به نسخه بهتری از خودتان است. در این دوره یاد می‌گیرید چگونه اهداف واقع‌بینانه تعیین کنید و برای رسیدن به آن‌ها برنامه‌ریزی کنید.',
            'با تمرین‌های عملی این دوره، عادت‌های مثبت را جایگزین عادت‌های مخرب می‌کنید، مدیریت زمان و انرژی را یاد می‌گیرید و اعتمادبه‌نفس خود را در زندگی شخصی و کاری افزایش می‌دهید.',
        ],
        prerequisites: [],
        language: 'فارسی',
        chapters: [
            {
                id: 1,
                title: 'فصل اول: شناخت خود و تعیین هدف',
                lessons: [
                    { id: 1, title: 'آشنایی با دوره و نقشه راه', duration: '۰۸:۳۰' },
                    { id: 2, title: 'خودشناسی؛ نقطه شروع تغییر', duration: '۱۲:۱۵' },
                    { id: 3, title: 'تعیین اهداف هوشمند (SMART)', duration: '۱۰:۴۵', locked: true },
                ],
            },
            {
                id: 2,
                title: 'فصل دوم: مدیریت زمان و انرژی',
                lessons: [
                    { id: 4, title: 'اولویت‌بندی کارها با ماتریس آیزنهاور', duration: '۰۹:۲۰' },
                    { id: 5, title: 'مدیریت انرژی در طول روز', duration: '۱۱:۰۰' },
                ],
            },
            {
                id: 3,
                title: 'فصل سوم: عادت‌سازی و پایداری تغییر',
                lessons: [
                    { id: 6, title: 'چرخه عادت‌ها و نحوه تغییر آن‌ها', duration: '۱۴:۱۰' },
                    { id: 7, title: 'حفظ انگیزه در مسیر رشد', duration: '۰۷:۴۵' },
                    { id: 8, title: 'جمع‌بندی و برنامه شخصی شما', duration: '۰۶:۳۰', locked: true },
                ],
            },
        ],
        teacher: {
            name: 'علی احمدی',
            role: 'مربی توسعه فردی',
            avatar: '/images/person.webp',
            bio: 'علی احمدی با بیش از ۱۰ سال تجربه در حوزه کوچینگ و توسعه فردی، به صدها نفر کمک کرده است تا مسیر رشد شخصی و حرفه‌ای خود را پیدا کنند. او مدرس کارگاه‌های متعدد خودشناسی و مدیریت زمان در سازمان‌های مطرح کشور است.',
            students: 4200,
            courses: 6,
            rating: 4.8,
        },
        reviews: [
            {
                id: 1,
                name: 'مریم کاظمی',
                rating: 5,
                date: '۱۴۰۴/۰۵/۱۲',
                comment: 'دوره بسیار کاربردی بود. تمرین‌های هدف‌گذاری واقعاً به من کمک کرد تمرکز بیشتری روی کارهای مهم داشته باشم.',
            },
            {
                id: 2,
                name: 'حمید رستمی',
                rating: 4,
                date: '۱۴۰۴/۰۴/۲۸',
                comment: 'محتوای خوب و بیان روانی داشت. کاش تعداد مثال‌های عملی بیشتر بود.',
            },
            {
                id: 3,
                name: 'نگار سلطانی',
                rating: 5,
                date: '۱۴۰۴/۰۳/۰۵',
                comment: 'بعد از مدت‌ها تونستم برنامه‌ریزی درستی برای روزم داشته باشم. ممنون از استاد و تیم نواندیش.',
            },
        ],
    },

    2: {
        description: 'مهارت‌های هفت‌گانه ICDL را به‌صورت پیشرفته و پروژه‌محور یاد بگیرید و در محیط کار حرفه‌ای‌تر عمل کنید.',
        fullDescription: [
            'دوره ICDL پیشرفته برای کسانی طراحی شده که کار با کامپیوتر را در سطح مقدماتی می‌دانند و می‌خواهند مهارت‌های خود را در نرم‌افزارهای آفیس و اینترنت به سطح حرفه‌ای برسانند.',
            'در این دوره با ترفندهای پیشرفته Word، فرمول‌نویسی حرفه‌ای در Excel، ساخت ارائه‌های جذاب با PowerPoint و مهارت‌های امنیت اطلاعات آشنا می‌شوید. تمام آموزش‌ها پروژه‌محور و همراه با تمرین است.',
        ],
        prerequisites: ['آشنایی مقدماتی با ویندوز', 'دسترسی به کامپیوتر'],
        language: 'فارسی',
        chapters: [
            {
                id: 1,
                title: 'فصل اول: مفاهیم پیشرفته IT و امنیت',
                lessons: [
                    { id: 1, title: 'مفاهیم شبکه و اینترنت', duration: '۱۵:۰۰' },
                    { id: 2, title: 'امنیت اطلاعات و حریم خصوصی', duration: '۱۳:۳۰' },
                ],
            },
            {
                id: 2,
                title: 'فصل دوم: Word پیشرفته',
                lessons: [
                    { id: 3, title: 'استایل‌ها و فهرست خودکار', duration: '۱۸:۴۵' },
                    { id: 4, title: 'ادغام پستی و فرم‌ها', duration: '۲۰:۱۰', locked: true },
                ],
            },
            {
                id: 3,
                title: 'فصل سوم: Excel پیشرفته',
                lessons: [
                    { id: 5, title: 'توابع پرکاربرد و ترکیبی', duration: '۲۲:۳۰' },
                    { id: 6, title: 'PivotTable و نمودارهای حرفه‌ای', duration: '۲۵:۰۰' },
                    { id: 7, title: 'ابزارهای تحلیل داده', duration: '۱۹:۱۵', locked: true },
                ],
            },
            {
                id: 4,
                title: 'فصل چهارم: ارائه و کار گروهی',
                lessons: [
                    { id: 8, title: 'PowerPoint حرفه‌ای', duration: '۱۶:۴۰' },
                    { id: 9, title: 'کار با ابزارهای همکاری آنلاین', duration: '۱۴:۲۰' },
                ],
            },
        ],
        teacher: {
            name: 'محمد حسینی',
            role: 'مدرس مهارت‌های کامپیوتر',
            avatar: '/images/person.webp',
            bio: 'محمد حسینی مدرس رسمی سازمان فنی و حرفه‌ای کشور است و بیش از ۸ سال سابقه تدریس دوره‌های ICDL برای سازمان‌ها و شرکت‌های بزرگ دارد. روش تدریس او ترکیبی از مفاهیم تئوری و پروژه‌های واقعی محیط کار است.',
            students: 3100,
            courses: 4,
            rating: 5,
        },
        reviews: [
            {
                id: 1,
                name: 'سینا مرادی',
                rating: 5,
                date: '۱۴۰۴/۰۶/۰۱',
                comment: 'فصل اکسل فوق‌العاده بود. توی کارم کلی سرعت‌م بیشتر شده.',
            },
            {
                id: 2,
                name: 'الهام جعفری',
                rating: 5,
                date: '۱۴۰۴/۰۵/۲۰',
                comment: 'مدرس خیلی مسلط بود و مطالب را مرحله‌به‌مرحله توضیح می‌داد. پیشنهاد می‌کنم.',
            },
        ],
    },

    3: {
        description: 'اصول مدیریت حرفه‌ای تیم‌ها و سازمان‌ها را از پایه یاد بگیرید و به یک مدیر مؤثر تبدیل شوید.',
        fullDescription: [
            'مدیریت حرفه‌ای فقط مختص مدیران نیست؛ هر کسی که با تیم کار می‌کند به مهارت‌های مدیریتی نیاز دارد. در این دوره با اصول برنامه‌ریزی، سازمان‌دهی، رهبری و کنترل آشنا می‌شوید.',
            'در طول دوره، با مطالعه موردکاوی‌های واقعی از شرکت‌های موفق ایرانی و بین‌المللی، مهارت تصمیم‌گیری و حل مسئله خود را تقویت می‌کنید و یاد می‌گیرید چگونه انگیزه تیم خود را حفظ کنید.',
        ],
        prerequisites: ['حداقل یک سال سابقه کار تیمی'],
        language: 'فارسی',
        chapters: [
            {
                id: 1,
                title: 'فصل اول: مبانی مدیریت',
                lessons: [
                    { id: 1, title: 'نقش‌ها و وظایف مدیر', duration: '۱۰:۰۰' },
                    { id: 2, title: 'مکاتب مدیریتی', duration: '۱۴:۳۰' },
                ],
            },
            {
                id: 2,
                title: 'فصل دوم: رهبری تیم',
                lessons: [
                    { id: 3, title: 'سبک‌های رهبری', duration: '۱۲:۴۵' },
                    { id: 4, title: 'مدیریت انگیزه و عملکرد', duration: '۱۷:۲۰' },
                    { id: 5, title: 'بازخورد مؤثر', duration: '۰۹:۱۰', locked: true },
                ],
            },
            {
                id: 3,
                title: 'فصل سوم: تصمیم‌گیری و حل مسئله',
                lessons: [
                    { id: 6, title: 'مدل‌های تصمیم‌گیری', duration: '۱۳:۰۰' },
                    { id: 7, title: 'حل مسئله خلاقانه', duration: '۱۵:۳۵' },
                    { id: 8, title: 'مدیریت بحران', duration: '۱۱:۵۰', locked: true },
                ],
            },
        ],
        teacher: {
            name: 'رضا عباسی',
            role: 'مشاور مدیریت سازمانی',
            avatar: '/images/person.webp',
            bio: 'رضا عباسی بیش از ۱۵ سال سابقه مدیریت در شرکت‌های بزرگ و مشاوره به سازمان‌های دولتی و خصوصی دارد. او نویسنده دو کتاب پرفروش در حوزه مدیریت تیم و بهره‌وری سازمانی است.',
            students: 2800,
            courses: 3,
            rating: 4.6,
        },
        reviews: [
            {
                id: 1,
                name: 'پیمان احمدزاده',
                rating: 4,
                date: '۱۴۰۴/۰۴/۱۵',
                comment: 'مطالب تئوری خوبی داشت ولی ای کاش کارگاه‌های عملی بیشتری برگزار می‌شد.',
            },
            {
                id: 2,
                name: 'شیرین موسوی',
                rating: 5,
                date: '۱۴۰۴/۰۲/۲۲',
                comment: 'فصل بازخورد مؤثر واقعاً دیدم رو عوض کرد. الان توی جلسات تیمم حسابی متفاوت عمل می‌کنم.',
            },
        ],
    },
}

const ipsumDescription = 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است.'

function fallbackDetail(course: courseType): courseDetailType {
    const chapters: chapterType[] = [
        {
            id: 1,
            title: 'فصل اول: آشنایی با دوره',
            lessons: [
                { id: 1, title: 'معرفی دوره و اهداف آن', duration: '۰۸:۰۰' },
                { id: 2, title: 'پیش‌نیازها و ابزارهای مورد نیاز', duration: '۱۰:۳۰' },
            ],
        },
        {
            id: 2,
            title: 'فصل دوم: مفاهیم اصلی',
            lessons: [
                { id: 3, title: 'مفاهیم پایه', duration: '۱۴:۱۵' },
                { id: 4, title: 'تمرین عملی اول', duration: '۱۸:۴۵' },
                { id: 5, title: 'تمرین عملی دوم', duration: '۱۲:۲۰', locked: true },
            ],
        },
        {
            id: 3,
            title: 'فصل سوم: جمع‌بندی و پروژه نهایی',
            lessons: [
                { id: 6, title: 'مرور مطالب دوره', duration: '۰۹:۴۰' },
                { id: 7, title: 'پروژه پایانی', duration: '۲۰:۰۰', locked: true },
            ],
        },
    ]

    return {
        description: ipsumDescription,
        fullDescription: [
            ipsumDescription,
            'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.',
        ],
        prerequisites: ['آشنایی مقدماتی با موضوع دوره', 'دسترسی به کامپیوتر یا گوشی هوشمند'],
        language: 'فارسی',
        chapters,
        teacher: {
            name: course.teacher,
            role: 'مدرس دوره',
            avatar: '/images/person.webp',
            bio: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ است. این مدرس سال‌هاست در حوزه تخصصی خود فعالیت می‌کند و تجربه ارزشمندی را در این دوره به اشتراک می‌گذارد.',
            students: course.members,
            courses: 2,
            rating: course.rate,
        },
        reviews: [
            {
                id: 1,
                name: 'کاربر نواندیش',
                rating: 5,
                date: '۱۴۰۴/۰۶/۱۰',
                comment: 'دوره خوبی بود و مطالب به‌صورت منظم ارائه شد. به دوستانم پیشنهاد می‌کنم.',
            },
            {
                id: 2,
                name: 'دانشجوی دوره',
                rating: 4,
                date: '۱۴۰۴/۰۵/۳۰',
                comment: 'کیفیت محتوا قابل قبول بود و پشتیبانی دوره هم پاسخگو بود.',
            },
        ],
    }
}

export function getCourseDetail(course: courseType): courseDetailType {
    return details[course.id] ?? fallbackDetail(course)
}

export function getLessonVideoUrl(lesson: lessonType): string {
    return lesson.videoUrl ?? '/videoTest.mp4'
}
