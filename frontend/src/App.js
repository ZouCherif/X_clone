import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AddProfilePic from "./pages/AddProfilePic";
import AddUsername from "./pages/AddUsername";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="profilePic" element={<AddProfilePic />} />
          <Route path="setUsername" element={<AddUsername />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
