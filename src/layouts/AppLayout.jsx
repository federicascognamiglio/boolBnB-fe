import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

function AppLayout() {
    return (
    <>
        <AppHeader />

        <main className="container mt-5">
            <Outlet />
            <h1>SUCAAAAAA</h1>
        </main>

        <AppFooter />
    </>
    )
}

export default AppLayout;