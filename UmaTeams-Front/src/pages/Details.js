import Navbar from "../components/NavBar";
import styled from "styled-components";
import Background from "../assets/HomeBackground.jpg"
import {TransparentCard, Header, CardImage, BlackMenuText} from "../components/DefaultStyles"

/*Estilos unicos de este componente Login */
  const PageContainerWithOverlay = styled.div`
  background: 
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${Background});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
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

const TrCardCenter = styled(TransparentCard) `

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 

`;


function Details() {
  return (
    <>
      <Navbar />
      <PageContainerWithOverlay>
        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
        
          <TrCardCenter>
            <Header>
              <CardImage src={"https://img.icons8.com/color/512/net-framework.png"}/>
            </Header>
            <BlackMenuText>
              El proyecto está construido con ASP.NET Core MVC para la funcionalidad BackEnd.
            </BlackMenuText>
          </TrCardCenter>

          <TrCardCenter>
            <Header>
              <img 
                src="https://c.tenor.com/u2cyE6qrV-wAAAAd/tenor.gif"
                alt="GIF animado"
                style={{ width: "250px", borderRadius: "8px" }}
              />
            </Header>

          </TrCardCenter>
          
          <TrCardCenter>
            <Header>
              <CardImage src={"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}/>
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
