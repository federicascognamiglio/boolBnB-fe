import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";
import Alert from "../components/Alert";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

function AppLayout() {
    return (
    <>
        <AppHeader/>

        <main className="container">
            <Alert />
            <Outlet />
        </main>

        <AppFooter/>
    </>
    )
}

export default AppLayout;