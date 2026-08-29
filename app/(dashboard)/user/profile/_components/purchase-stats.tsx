import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice01Icon, Playlist02Icon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { purchaseHistory, PurchaseStatusType } from "@/fake-data/user-dashboard";
import { cn } from "@/lib/utils";

const statusClass: Record<PurchaseStatusType, string> = {
    "موفق": "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    "ناموفق": "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    "در انتظار": "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

function PurchaseStats() {
    const totalPaid = purchaseHistory
        .filter(item => item.status === "موفق")
        .reduce((sum, item) => sum + item.price, 0);
    const activeCourses = purchaseHistory.filter(item => item.status === "موفق").length;

    const summary = [
        {
            label: "کل تراکنش‌ها",
            value: purchaseHistory.length.toLocaleString("fa-IR"),
            icon: Invoice01Icon,
            iconClass: "text-sky-500",
        },
        {
            label: "مجموع پرداختی",
            value: `${totalPaid.toLocaleString("fa-IR")} تومان`,
            icon: Wallet01Icon,
            iconClass: "text-emerald-500",
        },
        {
            label: "دوره‌های فعال",
            value: activeCourses.toLocaleString("fa-IR"),
            icon: Playlist02Icon,
            iconClass: "text-primary",
        },
    ];

    return (
        <div className="space-y-5">
            {/* کارت‌های خلاصه آمار */}
            <div className="grid gap-4 sm:grid-cols-3">
                {summary.map(item => (
                    <Card key={item.label} className="flex items-center gap-3 p-4">
                        <span className="flex items-center justify-center rounded-xl bg-muted p-2.5">
                            <HugeiconsIcon icon={item.icon} className={cn("size-6", item.iconClass)} />
                        </span>

                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            <p className="truncate text-sm font-bold text-gray-800 dark:text-white">{item.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* جدول تاریخچه خرید */}
            <Card className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>دوره</TableHead>
                            <TableHead>تاریخ خرید</TableHead>
                            <TableHead>مبلغ</TableHead>
                            <TableHead>روش پرداخت</TableHead>
                            <TableHead>وضعیت</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {purchaseHistory.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="text-muted-foreground">
                                    {item.id.toLocaleString("fa-IR")}
                                </TableCell>

                                <TableCell className="font-medium text-gray-800 dark:text-white">
                                    {item.courseTitle}
                                </TableCell>

                                <TableCell>{item.date}</TableCell>

                                <TableCell className="whitespace-nowrap">
                                    {item.price === 0
                                        ? "رایگان"
                                        : `${item.price.toLocaleString("fa-IR")} تومان`}
                                </TableCell>

                                <TableCell>{item.method}</TableCell>

                                <TableCell>
                                    <Badge variant="outline" className={statusClass[item.status]}>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}

export default PurchaseStats;
