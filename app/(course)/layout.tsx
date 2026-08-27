import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar/navbar";

type CourseLayoutProps = {
  children: React.ReactNode;
};

export default function CourseLayout({ children }: CourseLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
