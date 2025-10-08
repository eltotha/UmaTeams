import GSchibi from "../assets/GSchibi.png";
import GSchibi2 from "../assets/GSchibi2.png";
import { FooterContainer, Footer, FooterLogo, FooterText } from "./DefaultStyles";


function FooterBar() {
  return (
    <Footer>
      <FooterContainer>
        <FooterLogo src={GSchibi} alt="Logo 1" />
        <FooterText>© 2025 UmaTeams</FooterText>
        <FooterLogo src={GSchibi2} alt="Logo 2" />
      </FooterContainer>
    </Footer>
  );
}

export default FooterBar;
