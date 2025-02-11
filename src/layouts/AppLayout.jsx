import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

function AppLayout() {
    return (
    <>
        <AppHeader />

        <main className="container mt-4 mb-4">
            <Outlet />
        </main>

        <AppFooter />
    </>
    )
}

export default AppLayout;