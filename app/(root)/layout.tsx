import Footer from "@/components/custom/footer"
import Navbar from "@/components/custom/navbar/navbar"

import { getCartCount } from "@/actions/cart"

async function HomeLayout({ children }: LayoutProps<"/">) {
    const cartCount = await getCartCount()

    return (
        <div className="pb-16 md:pb-0">
            <Navbar cartCount={cartCount} />
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout
