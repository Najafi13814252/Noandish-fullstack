"use client";
import { useUser } from "@clerk/nextjs";
import { ReactNode } from "react";

interface RoleGuardProps {
    allow: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

function RoleGuard({ allow, children, fallback = null }: RoleGuardProps) {
    const { user } = useUser();

    const role = user?.publicMetadata?.role as string | undefined;

    if (!role || !allow.includes(role)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

export default RoleGuard