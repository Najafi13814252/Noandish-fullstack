import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar/navbar";

import { getCartCount } from "@/actions/cart";

type CourseLayoutProps = {
  children: React.ReactNode;
};

export default async function CourseLayout({ children }: CourseLayoutProps) {
  const cartCount = await getCartCount();

  return (
    <div className="flex min-h-screen flex-col pb-16 md:pb-0">
      <Navbar cartCount={cartCount} />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
