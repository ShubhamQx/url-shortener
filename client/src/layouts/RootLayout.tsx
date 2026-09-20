import { Outlet } from "react-router"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const RootLayout = () => {
  return (
    <div className="w-full max-w-360 mx-auto min-h-screen bg-background flex flex-col">
        <Header/>

        <main className="flex-1">
            <Outlet/>
        </main>

        <Footer/>
    </div>
  )
}

export default RootLayout