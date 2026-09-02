import { ImageResponse } from "next/og";

import { BRAND_COLORS, loadAradFont } from "@/lib/og-image";

export const size = {
    width: 180,
    height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
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
                    borderRadius: 40,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: -32,
                        right: -26,
                        width: 108,
                        height: 108,
                        borderRadius: 54,
                        background: "rgba(255, 255, 255, 0.08)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -40,
                        left: -32,
                        width: 122,
                        height: 122,
                        borderRadius: 61,
                        background: "rgba(255, 255, 255, 0.06)",
                    }}
                />

                <div
                    style={{
                        fontSize: 106,
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
