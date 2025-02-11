import { NavLink } from "react-router-dom";


function AppHeader() {
    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img className="logo" src="../images/bnb_logo.png" alt="" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link active" aria-current="page" href="/">Home</a>
                            <a class="nav-link" href="/search">Search</a>
                            <a class="nav-link" href="/detail">Detail</a>
                            <a class="nav-link" href="/create">Create</a>
                        </div>
                    </div>
                </div>
                {/* <Outlet /> */}
            </nav>
        </>
    )
}

export default AppHeader;