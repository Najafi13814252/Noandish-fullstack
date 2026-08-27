'use client';

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogIn, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import Register from "./register";

type LoginDialogProps = {
    variant?: "navbar" | "tab";
};

function LoginDialog({ variant = "navbar" }: LoginDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    variant === "navbar" ? (
                        <Button size="lg" className="dark:bg-primary/10">
                            <HugeiconsIcon icon={LogIn} className="size-5 rotate-180" />
                            ورود | ثبت‌نام
                        </Button>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="flex h-auto flex-col items-center gap-1 p-0 text-xs font-medium text-gray-500 hover:bg-transparent hover:text-primary"
                        >
                            <HugeiconsIcon icon={UserIcon} className="size-6" />
                            ورود
                        </Button>
                    )
                }
            />

            <DialogContent>
                <Register onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;
