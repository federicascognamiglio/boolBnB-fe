import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppLayout from "./layouts/AppLayout";
import HouseDetailPage from "./pages/HouseDetailPage";
import CreateHousePage from "./pages/CreateHousePage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail" element={<HouseDetailPage />} />
            <Route path="/create" element={<CreateHousePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
