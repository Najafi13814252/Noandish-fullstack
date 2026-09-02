import { ImageResponse } from "next/og";

import { BRAND_COLORS, loadAradFont } from "@/lib/og-image";

export const size = {
    width: 512,
    height: 512,
};

export const contentType = "image/png";

export default async function Icon() {
    const fontData = await loadAradFont();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${BRAND_COLORS.gradientFrom} 0%, ${BRAND_COLORS.gradientTo} 100%)`,
                }}
            >
                {/* هاله‌های تزئینی */}
                <div
                    style={{
                        position: "absolute",
                        top: -90,
                        right: -70,
                        width: 300,
                        height: 300,
                        borderRadius: 150,
                        background: "rgba(255, 255, 255, 0.08)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -110,
                        left: -90,
                        width: 340,
                        height: 340,
                        borderRadius: 170,
                        background: "rgba(255, 255, 255, 0.06)",
                    }}
                />

                <div
                    style={{
                        fontSize: 300,
                        lineHeight: 1,
                        color: BRAND_COLORS.white,
                        fontWeight: 800,
                        display: "flex",
                    }}
                >
                    ن
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Arad",
                    data: fontData,
                    weight: 800,
                    style: "normal",
                },
            ],
        }
    );
}
