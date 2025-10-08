import { useState } from "react";
import styled from "styled-components";
import {BtConfirm, FormGroup, TxtBox, TransparentCard, ButtonContainer, Header, Logo, CheckboxContainer } from "../components/DefaultStyles";
import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
import Background from "../assets/BackgroundLogin.jpg";
import { Link, useNavigate } from "react-router-dom";

/*Estilos unicos de este componente Login */
  const PageContainerWithOverlay = styled.div`
  background: 
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${Background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;


function Login() {

  //Constantes necesarias para el POST al backend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar como formulario
    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Password", password);
    formData.append("RememberMe", rememberMe);

    try {
      const response = await fetch("http://localhost:5045/Cuenta/Login", {
        method: "POST",
        body: formData, // se envia como formulario
      });

      const result = await response.text(); //Devuelve un string para verificar el resultado

      if (result === "true") {
        setMessage("Login correcto ✅");
        Navigate("/Home");
      } else {
        setMessage(result); //Mensaje de error en caso de fallo
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMessage("Error al conectar con el servidor ❌");
    }
  };

  return (
    <PageContainerWithOverlay>
      <TransparentCard>

        <Header>
          <Logo src={UmaTeamsLogo} alt="Logo UmaTeams" /> <br />
          <label style={{textSizeAdjust: "5px"}}>Inicio de Sesión</label>
        </Header>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <TxtBox
              type="text"
              name="Username"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
          </FormGroup>

          <FormGroup>
            <TxtBox
              type="password"
              name="Password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup><br />

          <CheckboxContainer>
            <input
              type="checkbox"
              name="RememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Recordarme
          </CheckboxContainer>


          <ButtonContainer>
            <BtConfirm type="submit">Ingresar</BtConfirm>

          </ButtonContainer>
        </form> <br/>
        {message && <p>{message}</p>}

        <footer style={{display: "flex", justifyContent: "center"}}> 
          No tienes una cuenta?
          <Link to="/Register" style={{color: "#ff66b2"}}> Registrate!</Link>
        </footer>
      </TransparentCard>
    </PageContainerWithOverlay>
  );
}


export default Login;
