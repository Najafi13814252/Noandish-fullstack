/**
 * به‌روزرسانی searchParams آدرس فعلی و push کردن آن بدون اسکرول.
 * خواندن آدرس از window داخل handler انجام می‌شود که در مستندات Next
 * به‌عنوان الگوی سبک‌تر نسبت به useSearchParams معرفی شده است.
 */
export function pushUpdatedSearchParams(
    pathname: string,
    push: (href: string, options?: { scroll?: boolean }) => void,
    mutate: (params: URLSearchParams) => void,
) {
    const params = new URLSearchParams(window.location.search)

    mutate(params)

    const query = params.toString()

    push(query ? `${pathname}?${query}` : pathname, { scroll: false })
}
