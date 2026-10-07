import { Navigate, Route, Routes } from "react-router-dom";

import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import RoleSelection from "../pages/auth/RoleSelection";

import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";
import PartnerStore from "../pages/general/PartnerStore";

import CreateFood from "../pages/create-food/CreateFood";

const RootRoute = () => {
  const role = localStorage.getItem("role");

  if (role === "user" || role === "partner") {
    return <Home />;
  }

  return <RoleSelection />;
};

const PartnerOnlyRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "partner") {
    return <Navigate to="/partner/login" replace />;
  }

  return children;
};

const UserOnlyRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role !== "user") {
    return <Navigate to="/user/login" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* First entry / logged-in home */}
      <Route path="/" element={<RootRoute />} />

      {/* User */}
      <Route path="/user/register" element={<UserRegister />} />

      <Route path="/user/login" element={<UserLogin />} />

      {/* Food Partner */}
      <Route path="/partner/register" element={<FoodPartnerRegister />} />

      <Route path="/partner/login" element={<FoodPartnerLogin />} />

      {/* User saved foods */}
      <Route
        path="/saved"
        element={
          <UserOnlyRoute>
            <Saved />
          </UserOnlyRoute>
        }
      />

      {/* Public partner store */}
      <Route path="/partner/:id" element={<PartnerStore />} />

      {/* Partner only */}
      <Route
        path="/create-food"
        element={
          <PartnerOnlyRoute>
            <CreateFood />
          </PartnerOnlyRoute>
        }
      />

      {/* Unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
