import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { LoginPage } from "./features/auth/pages/LoginPage";
import Welcome from "./features/welcome";
import Home from "./features/home";
function App() {


  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="w-screen h-screen relative">
        <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/home" element={<Home/>}>
          
        </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
