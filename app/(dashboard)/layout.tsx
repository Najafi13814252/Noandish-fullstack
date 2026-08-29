import Navbar from "@/components/custom/navbar/navbar";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col pb-16 md:pb-0">
            <Navbar />

            <main className="flex-1">{children}</main>
        </div>
    );
}
