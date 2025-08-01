import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navbar from "./components/Navbar.jsx";
import NavbarLocal from "./components/NavBarLocal.jsx";
import Page from "./trips/[tripID]/Page";
import Page2 from "./myTrips/Page";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Generator from "./generator";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./myconText/Context";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <App />
        <Footer />
      </>
    ),
  },
  {
    path: "/generator",
    element: (
      <>
        <NavbarLocal />
        <Generator />
        <Footer />
      </>
    ),
  },
  {
    path: "/trips/:tripID",
    element: (
      <>
        <NavbarLocal />
        <Page />
        <Footer />
      </>
    ),
  },
  {
    path: "/myTrips",
    element: (
      <>
        <NavbarLocal />
        <Page2 />
        <Footer />
      </>
    ),
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <GoogleOAuthProvider clientId="69115687811-hi5jqbq25qslflnac6ml3f0cm3c33lhc.apps.googleusercontent.com">
        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>
);
