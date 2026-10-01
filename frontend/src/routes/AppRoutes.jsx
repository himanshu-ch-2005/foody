import { Routes, Route } from "react-router-dom";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/user/register" element={<UserRegister />} />

      <Route path="/user/login" element={<UserLogin />} />

      <Route path="/partner/register" element={<FoodPartnerRegister />} />

      <Route path="/partner/login" element={<FoodPartnerLogin />} />
    </Routes>
  );
};

export default AppRoutes;
