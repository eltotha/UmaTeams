  import styled from "styled-components";

  export const Card = styled.div `
      
      font-family: 'Quicksand', sans-serif;
      background: #fff;
      width: 350px;
      margin: 100px auto;
      padding: 30px 25px;
      border-radius: 20px;
      border: 2px solid pink;
      text-align: center;
      transition: transform 0.2s ease, box-shadow 0.3s ease;
      `
  ;

  export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
    width: 100%;
  `;

  export const BtConfirm = styled.button`
    font-family: 'Quicksand', sans-serif;
    position: relative;
    display: inline-block;
    padding: 10px 30px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    border: 1px solid #000;
    border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    background: linear-gradient(to bottom, #b4ec51 0%, #429321 100%);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
    transition: all 0.15s ease-in-out;
    transform-origin: center;

    &:hover {
      background: linear-gradient(to bottom, #c4f55b 0%, #47a824 100%);
      border-color: #000;
    }

    /* Al hacer click */
    &:active {
      transform: scale(0.93);
    }

    /* Efecto de brillo diagonal */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -75%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      transform: skewX(-20deg);
    }

    &:hover::before {
      animation: shine 0.8s forwards;
    }

    @keyframes shine {
      0% {
        left: -75%;
      }
      100% {
        left: 125%;
      }
    }
  `;

  export const BtCancel = styled.button`
      font-family: inherit;
    position: relative;
    display: inline-block;
    padding: 10px 30px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    border: 1px solid #000;
    border-radius: 12px;
    cursor: pointer;
    overflow: hidden;
    background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
    transition: all 0.15s ease-in-out;
    transform-origin: center;

    &:hover {
      transform: scale(1.03);
    }

    /* Al hacer click */
    &:active {
      transform: scale(0.93);
    }

    /* Efecto de brillo diagonal */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -75%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0.8) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      transform: skewX(-20deg);
    }

    &:hover::before {
      animation: shine 0.8s forwards;
    }

    @keyframes shine {
      0% {
        left: -75%;
      }
      100% {
        left: 125%;
      }
    }
  `;


  export const CheckboxContainer = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    margin: 15px 0;
    
    input[type="checkbox"] {
      accent-color: #ff66b2; /* Color rosa */
      transform: scale(1.2);
      cursor: pointer;
    }
  `;


  export const Logo = styled.img`
    width: 80%;
    max-width: 350px;
    max-height: 120px;
    object-fit: contain;
    margin-bottom: 10px;
  `;

  export const CardImage = styled.img`
    width: 100%;
    max-width: 400px;
    max-height: 250px;
    object-fit: cover;
    border-radius: 15px;
  `;

  /* Componentes para el login y Registro */

  export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  `;

  export const FormGroup = styled.div`
    position: relative;
    padding: 20px 0 0;
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    margin-top: 20px
  `;

  export const TxtBox = styled.input`
    font-family: inherit;
    width: 100%;
    border: none;
    border-bottom: 2px solid #9b9b9b;
    outline: 0;
    font-size: 17px;
    color: #333;
    padding: 8px 0;
    background: transparent;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: #9b9b9b;
      transition: all 0.3s ease;
      font-size: 17px;
    }

    &:focus::placeholder {
      transform: translateY(-20px);
      font-size: 12px;
      color: #ff3385;
      font-weight: 700;
    }

    &:focus {
      padding-bottom: 6px;
      font-weight: 700;
      border-width: 3px;
      border-image: linear-gradient(to right, #ff66b2, #ff3385);
      border-image-slice: 1;
    }

    &:hover {
      border-bottom: 2px solid #ff66b2;
    }

    &:required, &:invalid {
      box-shadow: none;
    }
  `;

  export const FormLabel = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 17px;
    color: #9b9b9b;
    pointer-events: none;
  `;

  export const TransparentCard = styled.div`
    background: rgba(255, 255, 255, 0.82);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.4);
  `;

  export const TrCardCenter = styled(TransparentCard) `

    max-width: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  /* Estilos del home */

  export const MenuBar = styled.div`
    /* Dimensions and Shape */
    width: 100%;
    height: 50px; /* Adjust height as needed */

    /* --- Fijo arriba de todo --- */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    
    /* The bar is rounded only on the right end */
    border-bottom-left-radius: 20px; 
    border-bottom-right-radius: 20px;
    
    /* Green Gradient Background */
    background: #6ecc17; /* Fallback color */
    background-image: linear-gradient(
      to bottom,
      #90e637 0%,      /* Lighter green at the top */
      #6fcc17 100%     /* Deeper green at the bottom */
    );
    
    /* White 1px border on the bottom of the bar */
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    
    /* Optional: Small inner shadow for a lifted look */
    box-shadow: 
      inset 0 1px 0px rgba(255, 255, 255, 0), /* Inner top-shine */
      0 3px 5px rgba(0, 0, 0, 0.2); /* Outer bottom shadow */
  `;

  export const MenuText = styled.span`
    /* Font (using Quicksand as recommended earlier) */
    font-family: 'Quicksand', sans-serif; 
    font-weight: 700; /* Bold */
    font-size: 24px;  /* Adjust size as needed */
    color: #ffffff;  /* White text */
    text-align: center;
    
    /* Ensure it takes full width and centers properly */
    display: block;
    width: 100%;
  `;

  export const BlackMenuText = styled.span `

    font-family: 'Quicksand', sans-serif; 
    font-weight: 700;
    font-size: 24px;
    color: #000000;  /* Negro */
    text-align: center;
    
    display: block;
    width: 100%;

  `;

  export const MenuBarWithPattern = styled(MenuBar)`
    background-image: 
      /* The original gradient background */
      linear-gradient(to bottom, #90e637 0%, #6fcc17 100%);
    
    background-repeat: no-repeat, repeat;
    background-position: left center, center;
    background-size: auto 100%, cover;
  `;

  export const PinkMenuBar = styled(MenuBar)`
    background: #ff66b2; /* Fallback color */
    background-image: linear-gradient(
      to bottom,
      #ff66b2 0%,      /* Rosa principal */
      #ff3385 100%     /* Rosa más oscuro */
    );
    
    /* White 1px border on the bottom of the bar */
    border-bottom: 1px solid rgba(255, 255, 255, 0);
    
    /* Optional: Small inner shadow for a lifted look */
    box-shadow: 
      inset 0 1px 0px rgba(255, 255, 255, 0.5), /* Inner top-shine */
      0 3px 5px rgba(0, 0, 0, 0.2); /* Outer bottom shadow */
  `;

  // MenuBar con patrón en rosa
  export const PinkMenuBarWithPattern = styled(PinkMenuBar)`
      /* The original gradient background */
      linear-gradient(to bottom, #ff66b2 0%, #ff3385 100%);
      
    background-repeat: no-repeat, repeat;
    background-position: left center, center;
    background-size: auto 100%, cover;
  `;

  export const CharacterCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    width: 100%; /* Toma todo el ancho de su celda */
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 3px solid ${props => props.$borderColor || '#ccc'};

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin-top: 10px;
    }

    p {
      margin: 8px 0;
      word-wrap: break-word;
    }
  `;


  export const CharacterName = styled.h3`
    color: #333;
    margin-bottom: 10px;
    font-size: 1.2em;
  `;

  export const CharacterDescription = styled.p`
    color: #666;
    font-size: 0.9em;
    line-height: 1.4;
  `;

  export const CharactersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    /* auto-fit hace que se ajusten según el espacio disponible */
    gap: 20px;                  /* Separación entre cards */
    width: 100%;
    max-width: 1200px;           /* Limita el ancho máximo de la grid */
    padding: 20px;
    justify-items: center;       /* Centra cada card en su celda */
  `;


  export const TrCardGrid = styled(TransparentCard)`
    max-width: 100%;
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;


  /* Footer Styles */
  export const Footer = styled.footer`
    /* --- Fijo al fondo --- */
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;

    /* --- Fondo degradado verde --- */
    background: #6ecc17;
    background-image: linear-gradient(
      to top,
      #90e637 0%,     /* Verde más claro en la parte superior */
      #6fcc17 100%    /* Verde más oscuro en la parte inferior */
    );

    /* --- Bordes redondeados arriba --- */
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    /* --- Borde superior blanco sutil --- */
    border-top: 1px solid rgba(255, 255, 255, 0.3);

    /* --- Sombra superior para darle relieve --- */
    box-shadow: 
      inset 0 1px 0px rgba(255, 255, 255, 0.2),
      0 -3px 5px rgba(0, 0, 0, 0.2);

    /* --- Contenido centrado --- */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;

    z-index: 999;
  `;


  export const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
  `;

  export const FooterLogo = styled.img`
    height: 40px;
    width: auto;
    border-radius: 50%;
  `;

  export const FooterText = styled(MenuText)`
    color: #000;
    font-size: 1rem;
    font-weight: 700;
  `;

  export const SearchInput = styled.input`
    padding: 10px 15px;
    width: 300px;
    max-width: 80%;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.82);  /* Fondo semi-transparente */
    backdrop-filter: blur(5px);            /* Efecto blur */
    color: #ff3385;                           /* Texto blanco */
    margin: 20px auto;
    display: block;
    font-size: 1em;
    transition: border 0.3s ease, background 0.3s ease;

    &::placeholder {
      color: #ff66b2;     /* Color del placeholder */
    }

    &:focus {
      outline: none;
      border-color: #ff3385;
    }
  `;