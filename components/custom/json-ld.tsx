/**
 * کامپوننت کوچک برای تزریق structured data (JSON-LD) در صفحات سرور.
 *
 * <JsonLd data={{ "@context": "https://schema.org", "@type": "Course", ... }} />
 */
export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
