import { Route, Routes } from "react-router-dom";

import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";

import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import PartnerStore from "../pages/general/PartnerStore";

import CreateFood from "../pages/create-food/CreateFood";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/saved" element={<Saved />} />

      <Route path="/user/register" element={<UserRegister />} />

      <Route path="/user/login" element={<UserLogin />} />

      <Route path="/partner/register" element={<FoodPartnerRegister />} />

      <Route path="/partner/login" element={<FoodPartnerLogin />} />

      <Route path="/partner/:id" element={<PartnerStore />} />

      <Route path="/create-food" element={<CreateFood />} />
    </Routes>
  );
};

export default AppRoutes;
