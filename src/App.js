import "swiper/swiper.min.css";
import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";

import { Route, Routes } from "react-router-dom";
import PersistLogin from "./components/auth/PersistLogin";
import RequireAuth from "./components/auth/RequireAuth";
import RequireUnauth from "./components/auth/RequireUnauth";
import MainLayout from "./components/layouts/MainLayout";
import Catalog from "./pages/Catalog";
import Home from "./pages/Home";
import Login from "./pages/login/Login";
import MediaDetail from "./pages/media-detail/MediaDetail";
import PersonDetail from "./pages/person-detail/PersonDetail";
import Register from "./pages/register/Register";
import WatchPage from "./pages/watch-page/WatchPage";

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<RequireUnauth />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/register" element={<RequireUnauth />}>
          <Route index element={<Register />} />
        </Route>
        <Route path="/" element={<RequireAuth forAdmin={false} />}>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="movie">
              <Route
                path="browse"
                element={<Catalog itemType="movie" browseType="browse" />}
              />
              <Route
                path="search"
                element={<Catalog itemType="movie" browseType="search" />}
              />
              <Route path=":id" element={<MediaDetail itemType="movie" />} />
            </Route>
            <Route path="show">
              <Route
                path="browse"
                element={<Catalog itemType="show" browseType="browse" />}
              />
              <Route
                path="search"
                element={<Catalog itemType="show" browseType="search" />}
              />
              <Route path=":id" element={<MediaDetail itemType="show" />} />
            </Route>
            <Route path="person">
              <Route path=":id" element={<PersonDetail />} />
            </Route>
            <Route path="watch">
              <Route
                path="movie/:id"
                element={<WatchPage itemType="movie" />}
              />
              <Route
                path="show/:id/season/:seasonNumber/episode/:episodeNumber"
                element={<WatchPage itemType="show" />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<h1>404 Not found</h1>} />
    </Routes>
  );
}

export default App;
