import { Navigate } from "react-router-dom";

const SessionRedirect = () => {
  const userSession = "";
  //{ name: "ishan", role: "patient" }; //Replace with correct logic
  if (userSession) {
    return <Navigate to={`/${userSession.role}-dashboard`} />;
  }
  return <Navigate to="/login" />;
};

export default SessionRedirect;
