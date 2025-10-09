import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/NavBar";
import Background from "../assets/HomeBackground.jpg";
import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
import {
  Header,
  Logo,
  CharacterCard,
  CharacterName,
  CharacterDescription,
  CharactersGrid,
  TrCardGrid,
  TrCardCenter,
  SearchInput

} from "../components/DefaultStyles";
import FooterBar from "../components/Footer";

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: -1;
`;

const PageContainerWithOverlay = styled.div`
  background: 
    linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
    url(${Background}) no-repeat center top;
  background-size: contain;
  background-position: center top;
  background-repeat: no-repeat;

  min-height: 100vh;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  padding-top: 60px;
  overflow-x: hidden;
`;

function Characters() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); // estado para búsqueda

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5045/Uma/List");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <></>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

  // Filtrar personajes según el searchTerm
  const filteredData = data.filter(character =>
    character.name_en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <PageContainerWithOverlay>
        <BackgroundImg src={Background} />

        {/* Card del logo */}
        <TrCardCenter>
          <Header>
            <Logo src={UmaTeamsLogo} />
          </Header>
        </TrCardCenter>

        {/* Barra de búsqueda */}
        <SearchInput 
          type="text" 
          placeholder="Buscar personaje..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />

        {/* Grid de personajes */}
        <div style={{ marginTop: "20px", width: "100%" }}>
          <TrCardGrid>
            <CharactersGrid>
              {filteredData.map((character) => (
                <CharacterCard 
                    key={character.id} 
                    $borderColor={character.color_main || "#ccc"}
                >
                    <CharacterName>{character.name_en}</CharacterName>
                    {character.description && (
                    <CharacterDescription>{character.description}</CharacterDescription>
                    )}
                    {character.category_label && (
                    <p><strong>Categoría:</strong> {character.category_label}</p>
                    )}
                    {character.thumb_img && (
                    <img 
                        src={character.thumb_img} 
                        alt={character.name_en} 
                    />
                    )}
                </CharacterCard>
              ))}
            </CharactersGrid>
          </TrCardGrid>
        </div>
        <FooterBar />
      </PageContainerWithOverlay>
    </>
  );
}

export default Characters;
