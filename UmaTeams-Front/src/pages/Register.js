import { useState } from "react";
import styled from "styled-components";
import { BtConfirm, FormGroup, TxtBox, TransparentCard, ButtonContainer, Header } from "../components/DefaultStyles";
import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
import Background from "../assets/BackgroundLogin.jpg";
import { Link } from "react-router-dom";


/* Estilos únicos de este componente Register */
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

  const Logo = styled.img`
    width: 80%;
    max-width: 350px;
    max-height: 120px;
    object-fit: contain;
    margin-bottom: 10px;
  `;

  const PasswordRequirements = styled.div`
    font-size: 12px;
    color: #666;
    margin-top: -10px;
    margin-bottom: 15px;
    text-align: center;
  `;


function Register() {
  // Estados para el formulario de registro
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden ❌");
      return;
    }

    // Crear un FormData para enviar como formulario
    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Password", password);
    formData.append("ConfirmPassword", confirmPassword);

    try {
      const response = await fetch("http://localhost:5045/Cuenta/Register", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      if (result === "Usuario registrado") {
        setMessage("Registro exitoso ✅");
        // Opcional: redirigir al login después de un registro exitoso
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        setMessage(result);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMessage("Error al conectar con el servidor ❌");
    }
  };

  
  return (
    <PageContainerWithOverlay>
      <TransparentCard>
        <title>Registro</title>

        <Header>
          <Logo src={UmaTeamsLogo} alt="Logo UmaTeams" />
          <label style={{ textSizeAdjust: "5px" }}>Crear Cuenta</label>
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
          </FormGroup>

          <FormGroup>
            <TxtBox
              type="password"
              name="ConfirmPassword"
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </FormGroup>

          <PasswordRequirements>
            La contraseña debe tener al menos 6 caracteres
          </PasswordRequirements>

          <ButtonContainer>
            <BtConfirm type="submit">Registrarse</BtConfirm>
          </ButtonContainer> 
        </form> <br/>

        {message && <p style={{ textAlign: "center", margin: "15px 0" }}>{message}</p>}

        <footer style={{ display: "flex", justifyContent: "center" }}>
            ¿Ya tienes una cuenta?
            <Link to="/" style={{ color: "#ff66b2", marginLeft: "5px" }}>
              Inicia Sesión!
            </Link>
        </footer>
      </TransparentCard>
    </PageContainerWithOverlay>
  );
}

export default Register;