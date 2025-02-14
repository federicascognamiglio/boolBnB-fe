import { NavLink } from "react-router-dom";

function AppHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#013220" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img className="logo" src="../images/bnb_logo.png" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" style={{ color: "gold", fontSize: "1rem" }} aria-current="page" href="/">Home</a>
                            <a className="nav-link" style={{ color: "gold", fontSize: "1rem" }} href="/search">Search</a>
                            <a className="nav-link" style={{ color: "gold", fontSize: "1rem" }} href="/create">Create</a>
                        </div>
                    </div>
                </div>
                {/* <Outlet /> */}
            </nav>
        </>
    )
}

export default AppHeader;