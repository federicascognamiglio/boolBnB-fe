import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

function AppLayout() {
    return (
    <>
        <AppHeader />

        <main>
            <Outlet />
        </main>

        <AppFooter />
    </>
    )
}

export default AppLayout;