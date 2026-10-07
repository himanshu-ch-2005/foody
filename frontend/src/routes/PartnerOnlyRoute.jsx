import { Navigate, Outlet } from "react-router-dom";

const PartnerOnlyRoute = () => {
  const isPartner = localStorage.getItem("role") === "partner";

  if (!isPartner) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PartnerOnlyRoute;
