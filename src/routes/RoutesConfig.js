import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const Catalog = lazy(() => import("../pages/Catalog"));
const Home = lazy(() => import("../pages/Home"));
const Detail = lazy(() => import("../pages/Detail"));
const Genres = lazy(() => import("../pages/Genres"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Personal = lazy(() => import("../pages/Personal"));
const Profile = lazy(() => import("../pages/Profile"));
const Explore = lazy(() => import("../pages/Explore"));

function RoutesConfig() {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <Routes>
        <Route path="/:catagory/search/:keyword" element={<Catalog />}></Route>
        <Route path="/:catagory/:id" element={<Detail />}></Route>

        <Route path="/:catagory/genres/:genres_id" element={<Genres />}></Route>

        <Route path="/" element={<Home></Home>}></Route>

        <Route path="/about" element={<SearchPage />}></Route>

        <Route path="/:catagory" element={<Catalog />}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/personal/:feature"
          element={<Personal></Personal>}
        ></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/explore/:keyword" element={<Explore></Explore>}></Route>
        <Route path="/explore" element={<Explore></Explore>}></Route>
      </Routes>
    </Suspense>
  );
}

export default RoutesConfig;
