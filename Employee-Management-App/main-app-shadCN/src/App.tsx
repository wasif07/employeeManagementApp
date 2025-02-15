import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBar from "./pages/AppBar";
import DisplayData from "./pages/DisplayData";
import AddData from "./pages/AddData";

// Define the App component
const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path={"/input-data"} element={<AddData />} />
          <Route path={"/display-data"} element={<DisplayData />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
