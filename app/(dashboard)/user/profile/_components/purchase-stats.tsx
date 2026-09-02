import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice01Icon, Playlist02Icon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { PurchaseHistoryItem, PurchaseStatsData } from "@/actions/payment";
import { cn } from "@/lib/utils";

const statusLabel: Record<PurchaseHistoryItem["status"], string> = {
    SUCCESS: "موفق",
    FAILED: "ناموفق",
    PENDING: "در انتظار",
};

const statusClass: Record<PurchaseHistoryItem["status"], string> = {
    SUCCESS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
    FAILED: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400",
    PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
};

function PurchaseStats({ stats }: { stats: PurchaseStatsData }) {
    const summary = [
        {
            label: "کل تراکنش‌ها",
            value: stats.totalCount.toLocaleString("fa-IR"),
            icon: Invoice01Icon,
            iconClass: "text-sky-500",
        },
        {
            label: "مجموع پرداختی",
            value: `${stats.totalPaid.toLocaleString("fa-IR")} تومان`,
            icon: Wallet01Icon,
            iconClass: "text-emerald-500",
        },
        {
            label: "دوره‌های فعال",
            value: stats.activeCourses.toLocaleString("fa-IR"),
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
                            <TableHead>کد رهگیری</TableHead>
                            <TableHead>وضعیت</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {stats.history.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-muted-foreground">
                                    {(index + 1).toLocaleString("fa-IR")}
                                </TableCell>

                                <TableCell className="font-medium text-gray-800 dark:text-white">
                                    {item.courseTitle}
                                </TableCell>

                                <TableCell>{item.date}</TableCell>

                                <TableCell className="whitespace-nowrap">
                                    {item.amount === 0
                                        ? "رایگان"
                                        : `${item.amount.toLocaleString("fa-IR")} تومان`}
                                </TableCell>

                                <TableCell>{item.method}</TableCell>

                                <TableCell className="whitespace-nowrap">
                                    {item.refId ? Number(item.refId) : "—"}
                                </TableCell>

                                <TableCell>
                                    <Badge variant="outline" className={statusClass[item.status]}>
                                        {statusLabel[item.status]}
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
