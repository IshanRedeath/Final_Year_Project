import { Navigate, useLocation } from "react-router-dom";

const SessionRedirect = () => {
  const location = useLocation().pathname;
  const userSession = { name: "ishan", role: "patient" };
  //{ name: "ishan", role: "patient" }; //Replace with correct logic
  if (userSession && location === "/") {
    window.location.href = `/${userSession.role}-dashboard`;
  } else if (!userSession) {
    return <Navigate to="/login" />;
  }
};
export default SessionRedirect;
