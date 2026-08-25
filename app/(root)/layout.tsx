import Navbar from "@/components/custom/navbar/navbar"

function HomeLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="">
            <Navbar />
            {children}
        </div>
    )
}

export default HomeLayout
