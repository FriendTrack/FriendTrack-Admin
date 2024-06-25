import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RootPage from "./pages/rootPage/RootPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootPage />} />
      <Route path="*" element={<RootPage />} />
    </>
  )
);
