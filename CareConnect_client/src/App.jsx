import { BrowserRouter as Router, RouterProvider } from "react-router-dom";
import PatientNavigation from "./components/Patient/PatientNavigation";
import Headerbar from "./components/Common/Header/Headerbar";
//import PatientDashboard from "./components/Patient/_tests_/PatientDashboard";
import image1 from "./assets/1527071.jpg";
import image2 from "./assets/6141935.jpg";
import { router } from "./routes/router";

function App() {
  return (
    <div>
      {" "}
      <RouterProvider router={router} />
      {/*
        <PatientNavigation /> */}
      {/* <h1>hi</h1> */}
      {/* <img src={image1} alt="" height="500px" width="300px" />
      <img src={image1} alt="" height="500px" width="300px" />
      <img src={image2} alt="" height="500px" width="300px" /> */}
    </div>
  );
}

export default App;
