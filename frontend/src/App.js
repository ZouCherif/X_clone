import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import RegisterFlow from "./pages/RegisterFlow";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="login/flow" element={<RegisterFlow />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
