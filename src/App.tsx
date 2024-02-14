import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./views/Dashboard/Dashboard";
import { Login } from "./views/Login/Login";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/> 
        <Route path="/login"  element={<Login/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
