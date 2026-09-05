"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function SettingsForm() {
    const { user } = useUser();

    const [form, setForm] = useState({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        phone: "",
        bio: "",
    });

    const handleChange = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: event.target.value }));
    };

    const handleSave = () => {
        toast.success("به زودی امکان ویرایش پروفایل فعال می‌شود!");
    };

    return (
        <div className="space-y-5">
            {/* اطلاعات حساب */}
            <Card className="space-y-4 p-5">
                <h2 className="font-bold text-gray-800 dark:text-white">اطلاعات حساب</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">نام</Label>
                        <Input id="firstName" value={form.firstName} onChange={handleChange("firstName")} placeholder="نام خود را وارد کنید" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="lastName">نام خانوادگی</Label>
                        <Input id="lastName" value={form.lastName} onChange={handleChange("lastName")} placeholder="نام خانوادگی خود را وارد کنید" />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="email">ایمیل</Label>
                        <Input
                            id="email"
                            value={user?.emailAddresses[0]?.emailAddress ?? ""}
                            disabled
                            dir="ltr"
                            className="text-left opacity-60"
                        />
                    </div>
                </div>
            </Card>

            {/* اطلاعات تکمیلی */}
            <Card className="space-y-4 p-5">
                <h2 className="font-bold text-gray-800 dark:text-white">اطلاعات تکمیلی</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="phone">شماره موبایل</Label>
                        <Input id="phone" value={form.phone} onChange={handleChange("phone")} placeholder="۰۹۱۲۳۴۵۶۷۸۹" dir="ltr" className="text-left" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">بیوگرافی</Label>
                        <Input id="bio" value={form.bio} onChange={handleChange("bio")} placeholder="درباره خودتان بنویسید" />
                    </div>
                </div>
            </Card>

            <Button size="lg" onClick={handleSave} className="dark:bg-primary/10">
                ذخیره تغییرات
            </Button>
        </div>
    );
}

export default SettingsForm;
