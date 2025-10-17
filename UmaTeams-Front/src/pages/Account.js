import styled from "styled-components";
import Background from "../assets/HomeBackground.jpg";
import { TrCardCenter, BtConfirm, BtCancel, BlackMenuText } from "../components/DefaultStyles";
import NavBar from "../components/NavBar";
import FooterBar from "../components/Footer";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

/*Estilos únicos del componente*/
const PageContainerWithOverlay = styled.div`
  background: 
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${Background});
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;
`;

function Account({ onLogout }) {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5045/Cuenta/Logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.id) // Enviamos el id al backend
      });

      const result = await response.json();
      setMessage(result.message);
      setUser(null); // Limpiamos el contexto
      onLogout({});
      navigate("/"); // Redirige al login
    } catch (error) {
      console.error(error);
      setMessage("Error al cerrar sesión ❌");
    }
  };

  const handleDeleteUser = async () => {
    if (!window.confirm("¿Seguro quieres eliminar tu cuenta? Esta acción es irreversible.")) return;

    try {
      const response = await fetch("http://localhost:5045/Cuenta/DeleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user.id) // Enviamos el id al backend
      });

      const result = await response.json();
      setMessage(result.message);
      setUser(null); // Limpiamos el contexto
      navigate("/"); // Redirige a registro
    } catch (error) {
      console.error(error);
      setMessage("Error al eliminar usuario ❌");
    }
  };

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <PageContainerWithOverlay>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <TrCardCenter style={{ maxHeight: "350px", maxWidth: "250px" }}>
          <BlackMenuText style={{ marginBottom: "20px" }}>
            {user.username} {/* Mostramos el nombre del usuario */}
          </BlackMenuText>
          <BtConfirm style={{ marginBottom: "20px" }} onClick={handleLogout}>
            Logout
          </BtConfirm>
          <BtCancel onClick={handleDeleteUser}>
            Delete User
          </BtCancel>
        </TrCardCenter>
      </div>
      {message && <p>{message}</p>}
      <FooterBar />
    </PageContainerWithOverlay>
  );
}

export default Account;
