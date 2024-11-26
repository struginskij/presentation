import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signin from "./pages/Auth/Signin/index";
import Signup from "./pages/Auth/Signup/index";
import Products from "./pages/Products/index";
import ProductDetail from "./pages/ProductDetail/index";
import Basket from "./pages/Basket/index";
import Error404 from "./pages/Error404/index";
import ProductedProfile from "./pages/ProductedRoute/ProductedProfile";
import EditProfile from "./pages/EditProfile";
import ProductedAdmin from "./pages/ProductedRoute/ProductedAdmin";
import Orders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import NewProduct from "./pages/Products/New";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/react";

function App() {
  useEffect(() => {
    const ENV = ["production", "dev", "staging"][Math.floor(Math.random() * 3)];

    Sentry.init({
      dsn: "https://c6a312ca62353f8d6a1a96860a4c1840@o4508349255778304.ingest.de.sentry.io/4508349259448400",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      environment: ENV,
      // Tracing
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  }, []);
  const [isSignInVisible, setIsSignInVisible] = useState("");
  const data = [
    {
      title: "iPhone 14",
      description: "Latest model of the iPhone series.",
      price: 999.99,
      photos: [],
      createdAt: "2024-11-26T00:00:00.000Z",
      id: "2ec6b4a6-289f-4ca3-8863-eb7fe1912747"
    },
    {
      title: "Samsung Galaxy S23",
      description: "Flagship Samsung smartphone with advanced features.",
      price: 899.99,
      photos: [],
      createdAt: "2024-11-26T00:00:00.000Z",
      id: "deadbeef-289f-4ca3-8863-eb7fe1912747"
    },
    {
      title: "Google Pixel 8",
      description: "Google's latest Pixel phone with pure Android experience.",
      price: 799.99,
      photos: [],
      createdAt: "2024-11-26T00:00:00.000Z",
      id: "3ec6b4a6-289f-4ca3-8863-eb7fe1912747"
    },
    {
      title: "Dell XPS 15",
      description: "High-performance laptop for professionals.",
      price: 1499.99,
      photos: [],
      createdAt: "2024-11-26T00:00:00.000Z",
      id: "4ec6b4a6-289f-4ca3-8863-eb7fe1912747"
    },
    {
      title: "Sony WH-1000XM5",
      description: "Noise-cancelling headphones with excellent sound quality.",
      price: 399.99,
      photos: [],
      createdAt: "2024-11-26T00:00:00.000Z",
      id: "5ec6b4a6-289f-4ca3-8863-eb7fe1912747"
    },
  ];
  return (
    <>
      <Navbar
        isSignInVisible={isSignInVisible}
        setIsSignInVisible={setIsSignInVisible}
      />
      <div id="content">
        <Routes>
          <Route path="/" exect index element={<Products data={data} />} />
          <Route
            path="/product/:product_id"
            element={<ProductDetail data={data} />}
          />
          <Route
            path="/signin"
            element={<Signin setIsSignInVisible={setIsSignInVisible} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/profile" element={<ProductedProfile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/admin">
            <Route index element={<ProductedAdmin />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products">
              <Route index element={<AdminProducts />} />
              <Route path=":product_id" element={<AdminProductDetail />} />
              <Route path="new" element={<NewProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
