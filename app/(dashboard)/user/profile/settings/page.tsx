import PageHeader from "../_components/page-header";
import SettingsForm from "../_components/settings-form";

export default function SettingsPage() {
    return (
        <section className="space-y-5">
            <PageHeader
                title="تنظیمات"
                description="مشخصات حساب کاربری خود را مدیریت کنید"
            />

            <SettingsForm />
        </section>
    );
}
