import { ImageResponse } from "next/og";

import { BRAND_COLORS, loadAradFont, loadAradMediumFont } from "@/lib/og-image";
import { SITE_NAME } from "@/lib/seo";

export const alt = "نواندیش | بنیاد تعالی آموزش‌های تخصصی";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    const [fontBold, fontMedium] = await Promise.all([
        loadAradFont(),
        loadAradMediumFont(),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    // satori محور افقی flex را برای direction: rtl برعکس نمی‌کند؛
                    // پس چیدمان راست‌چین را صریح با flex-end اعمال می‌کنیم
                    alignItems: "flex-end",
                    direction: "rtl",
                    padding: "64px 72px",
                    background: `linear-gradient(135deg, ${BRAND_COLORS.gradientFrom} 0%, ${BRAND_COLORS.gradientTo} 100%)`,
                }}
            >
                {/* هاله‌های تزئینی */}
                <div
                    style={{
                        position: "absolute",
                        top: -180,
                        left: -120,
                        width: 480,
                        height: 480,
                        borderRadius: 240,
                        background: "rgba(255, 255, 255, 0.07)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -220,
                        right: -100,
                        width: 560,
                        height: 560,
                        borderRadius: 280,
                        background: "rgba(255, 255, 255, 0.05)",
                    }}
                />

                {/* برند */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 20,
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 18,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(255, 255, 255, 0.14)",
                            color: BRAND_COLORS.white,
                            fontSize: 44,
                            fontWeight: 800,
                        }}
                    >
                        ن
                    </div>
                    <div
                        style={{
                            fontSize: 42,
                            fontWeight: 800,
                            color: BRAND_COLORS.white,
                            display: "flex",
                        }}
                    >
                        {SITE_NAME}
                    </div>
                </div>

                {/* عنوان اصلی */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: 20,
                    }}
                >
                    <div
                        style={{
                            fontSize: 60,
                            fontWeight: 800,
                            color: BRAND_COLORS.white,
                            lineHeight: 1.35,
                            textAlign: "right",
                            whiteSpace: "nowrap",
                            display: "flex",
                        }}
                    >
                        بنیاد تعالی آموزش‌های تخصصی
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            fontWeight: 500,
                            color: BRAND_COLORS.accent,
                            textAlign: "right",
                            display: "flex",
                        }}
                    >
                        آموزش‌های تخصصی همراه با توسعه فردی برای سازمان‌ها و شرکت‌ها
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Arad",
                    data: fontBold,
                    weight: 800,
                    style: "normal",
                },
                {
                    name: "AradMedium",
                    data: fontMedium,
                    weight: 500,
                    style: "normal",
                },
            ],
        }
    );
}
