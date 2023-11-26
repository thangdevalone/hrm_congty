import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import "./app.css";
import { LoginPage } from "./features/auth/pages/LoginPage";
import Welcome from "./features/welcome";
function App() {


  return (
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="w-screen h-screen relative">
        <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
