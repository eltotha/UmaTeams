import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import Details from "./pages/Details";
import Characters from "./pages/Characters";
import TeamMaker from "./pages/TeamMaker";
import Account from "./pages/Account";

function App(){
  return(
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Details" element={<Details />}/>
        <Route path="/Characters" element={<Characters />} />
        <Route path="/TeamMaker" element={<TeamMaker />} />
        <Route path="/Account" element={<Account />} />
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<div>Página no encontrada - 404</div>} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
} 

export default App;