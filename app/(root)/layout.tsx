import Footer from "@/components/custom/footer"
import Navbar from "@/components/custom/navbar/navbar"

function HomeLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="">
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout
