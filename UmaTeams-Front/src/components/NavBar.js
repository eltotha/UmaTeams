import { useState } from "react";
import { Link } from "react-router-dom";
import GSchibi from "../assets/GSchibi.png";
import GSchibi2 from "../assets/GSchibi2.png"
import { PinkMenuBarWithPattern, MenuText } from "./DefaultStyles"
import styled from "styled-components";

// Styled components para el layout
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 20px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  transition: all 0.3s ease;
  
   &:active {
    transform: scale(0.93);
  }
`;

function NavBar(){
    const [isHovered, setIsHovered] = useState(false);

    return(
       <PinkMenuBarWithPattern>
        
        <NavContainer>
            {/* Logo a la izquierda */}
            <LogoContainer>
               <Link to="/Home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img
                    src={isHovered ? GSchibi2 : GSchibi}
                    alt="Logo"
                    style={{ height: "40px", marginRight: "10px" }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    />
                    <MenuText>UmaTeams</MenuText>
                </Link> 
            </LogoContainer>
           
            {/* Enlaces de navegación a la derecha */}
            <LinksContainer style={{paddingRight: "3%"}}>
                <NavLink to="/Home">
                    <MenuText>Inicio</MenuText>
                </NavLink>

                <NavLink to="/Characters">
                    <MenuText>Personajes</MenuText>
                </NavLink>

                <NavLink to="/Details">
                    <MenuText>Detalles</MenuText>
                </NavLink>

                <NavLink to="/TeamMaker">
                    <MenuText>Equipos</MenuText>
                </NavLink>
            </LinksContainer>
        </NavContainer>

       </PinkMenuBarWithPattern>
    );
}

export default NavBar;