import styled from "styled-components";
import Background from "../assets/HomeBackground.jpg"
import {TransparentCard, Logo, Header, CardImage, BtConfirm, TrCardCenter} from "../components/DefaultStyles"
import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
import { NavLink } from "react-router-dom";
import NavBar from "../components/NavBar";
import FooterBar from "../components/Footer";

/*Estilos unicos de este componente Login */
 const PageContainerWithOverlay = styled.div`
  background:
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${Background});
  background-size: cover;
  background-position: center;
  min-height: 90vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 60px;
  overflow-x: hidden;
`;





function Home() {
  return (
    <>
      <PageContainerWithOverlay>
        <NavBar />
        <TransparentCard>
          <Header>
            <Logo src={UmaTeamsLogo} alt="Logo UmaTeams" />
          </Header>
        </TransparentCard><br/>

        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
        
          <TrCardCenter>
            <Header>
              <CardImage src={"https://umamusu.wiki/w/images/5/51/2021_03_osaka.jpg"} alt="Logo UmaTeams" />
            </Header>

            <NavLink to="/Characters">
              <BtConfirm style={{margin: "20px auto 0 auto;"}}>
              Meet all the Uma Musume!
            </BtConfirm>
            </NavLink>
          </TrCardCenter>

          <TrCardCenter>
            <Header>
              <CardImage src={"https://umamusu.wiki/w/images/1/11/ES-W02bVAAAB57v.jpg"} alt="Logo UmaTeams" />
            </Header>

            <NavLink to="/TeamMaker">
              <BtConfirm style={{margin: "20px auto 0 auto;"}}>
                Create a team for them!
            </BtConfirm>
            </NavLink>
          </TrCardCenter>
          
          <TrCardCenter>
            <Header>
              <CardImage src={"https://umamusu.wiki/w/images/c/c9/2021_04_haruten.jpg"} alt="Logo UmaTeams" />
            </Header>

            <NavLink to="/Details">
              <BtConfirm style={{margin: "20px auto 0 auto;"}}>
                See info about the page!
            </BtConfirm>
            </NavLink>
          </TrCardCenter>

        </div>
        <FooterBar />
      </PageContainerWithOverlay>

      
    </>
  );
}

export default Home;
