import { useState, useContext } from "react";
import styled from "styled-components";
import {
  BtConfirm,
  FormGroup,
  TxtBox,
  TransparentCard,
  ButtonContainer,
  Header,
  Logo,
  CheckboxContainer
} from "../components/DefaultStyles";
import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
import Background from "../assets/BackgroundLogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

/*Estilos únicos de este componente Login */
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

function Login({ onLogin }) {
  // Contexto para guardar datos del usuario
  const { setUser } = useContext(UserContext);

  // Constantes necesarias para el POST al backend
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5045/Cuenta/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Password: password,
          RememberMe: rememberMe
        }),
      });

      const data = await response.json(); // JSON devuelto por el backend

      if (response.ok) {
        setUser(data); // guardar datos en el contexto
        onLogin(data);
        setMessage("Login correcto ✅");
        navigate("/Home");
      } else {
        setMessage(data.message || "Error al iniciar sesión ❌");
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
          <label style={{ textSizeAdjust: "5px" }}>Inicio de Sesión</label>
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
        </form>
        <br/>
        {message && <p>{message}</p>}

        <footer style={{ display: "flex", justifyContent: "center" }}>
          No tienes una cuenta?
          <Link to="/Register" style={{ color: "#ff66b2" }}> Registrate!</Link>
        </footer>
      </TransparentCard>
    </PageContainerWithOverlay>
  );
}

export default Login;
