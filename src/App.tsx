import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { Login } from "./views/Login/Login";
import { useEffect } from "react";
import { useAppSelector } from "./redux/store";

function App() {
  const isLoginError = useAppSelector((state) => state.errors.isLoginError);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoginError) {
      navigate("/login");
    }
  }, [isLoginError]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
