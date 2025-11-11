import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import Details from "./pages/Details";
import Characters from "./pages/Characters";
import TeamMaker from "./pages/TeamMaker";
import Account from "./pages/Account";
import { useState } from "react";
import LoginFail from "./pages/LoginFail";

function App(){
  const [user, setUser] = useState({});

  function handleUser(data) {
    setUser(data);
  }

  const isLoggedIn = Object.keys(user).length > 0;

  console.log('Usuario: ' + user);

  return(
    <UserProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleUser} />} />
        <Route path="/Register" element={<Register />} />
        
        
        {isLoggedIn && 
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/Details" element={<Details />}/>
            <Route path="/Characters" element={<Characters />} />
            <Route path="/TeamMaker" element={<TeamMaker />} />
            <Route path="/Account" element={<Account onLogout={handleUser} />} />
          </>
        }
        
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<LoginFail />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
} 

export default App;