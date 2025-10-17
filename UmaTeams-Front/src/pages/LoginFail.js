import styled from "styled-components";
import { TrCardCenter, Header, CardImage, BlackMenuText} from "../components/DefaultStyles";

 const PageContainerWithOverlay = styled.div`
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

function LoginFail(){




    return (
        <PageContainerWithOverlay>
            <TrCardCenter>
            <Header>
                <CardImage src="https://ih1.redbubble.net/image.5883925055.3391/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg" />
            </Header>
            <BlackMenuText>
                NOPE YOU CAN'T DO THAT
            </BlackMenuText>

        </TrCardCenter>
        </PageContainerWithOverlay>
        
    );
}

export default LoginFail;