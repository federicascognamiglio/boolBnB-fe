import { NavLink } from "react-router-dom";

function AppHeader() {
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#013220" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/"><img className="logo ms-4" src="../images/bnb_logo.png" alt="" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation"
                    style={{ backgroundColor: "white" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            {/* <a className="nav-link active" style={{ color: "gold", fontSize: "1rem" }} aria-current="page" href="/">Home</a> */}
                            <a className="nav-link me-4" style={{ color: "gold", fontSize: "1rem" }} href="/create">Aggiungi annuncio</a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default AppHeader;