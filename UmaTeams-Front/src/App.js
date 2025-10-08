import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import Details from "./pages/Details";
import Characters from "./pages/Characters";
import NavBar from "./components/NavBar";
import FooterBar from "./components/Footer";

function App(){
  return(
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Details" element={<Details />}/>
        <Route path="/Characters" element={<Characters />} />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<div>Página no encontrada - 404</div>} />
      </Routes>
      <FooterBar />
    </BrowserRouter>
  );
} 

export default App;