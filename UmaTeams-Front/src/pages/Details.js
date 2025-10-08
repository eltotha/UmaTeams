import styled from "styled-components";
import Background from "../assets/HomeBackground.jpg"
import {TrCardCenter, Header, CardImage, BlackMenuText} from "../components/DefaultStyles"

/*Estilos unicos de este componente Login */
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

  /* 🔹 Centramos el contenido */
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* Evita scroll lateral */
  overflow-x: hidden;

`;



function Details() {
  return (
    <>
      <PageContainerWithOverlay>
        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
        
          <TrCardCenter style={{maxHeight: "350px", maxWidth: "250px"}}>
            <Header>
              <CardImage src={"https://img.icons8.com/color/512/net-framework.png"}/>
            </Header>
            <BlackMenuText>
              El proyecto está construido con ASP.NET Core MVC para la funcionalidad BackEnd.
            </BlackMenuText>
          </TrCardCenter>

          <TrCardCenter style={{maxHeight: "350px", maxWidth: "250px"}}>
            <Header>
              <img 
                src="https://c.tenor.com/u2cyE6qrV-wAAAAd/tenor.gif"
                alt="GIF animado"
                style={{ width: "250px", borderRadius: "8px" }}
              />
            </Header>

          </TrCardCenter>
          
          <TrCardCenter style={{maxHeight: "350px", maxWidth: "250px"}}>
            <Header>
              <CardImage src={"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"} style={{maxWidth: ""}}/>
            </Header>
            <BlackMenuText>
              El FrontEnd del proyecto esta creado en React, lo que hace posible todo lo que has visto.
            </BlackMenuText>

            
          </TrCardCenter>

        </div>

      </PageContainerWithOverlay>
    </>
  );
}

export default Details;
