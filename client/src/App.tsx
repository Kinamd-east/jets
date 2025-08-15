import { Route, Routes } from "react-router";
import "./index.css";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Success from "./pages/Success";
import Signup from "./pages/auth/Signup";
import { RootLayout, AuthLayout } from "@/layout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/payment-success" element={<Success />} />
          <Route path="/shop" element={<Shop />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
