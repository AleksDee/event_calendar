import { Navigate, Routes, Route } from "react-router-dom";
// import { privateRoutes, publicRoutes } from '../router'
import Login from "../pages/Login";
import Event from "../pages/Event";
import Error from "../pages/Error";
import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";

export default function AppRouter() {
  // const { isAuth } = useSelector((state) => state);
  const { isAuth } = useTypedSelector((state) => state.auth);
  console.log(isAuth);
  // let privateRoutesArr = privateRoutes.map(route => <Route path={route.path} key={route.path}>{route.component}</Route>)
  // let publicRoutesArr = privateRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Event />} />
    </Routes>
  );
}
