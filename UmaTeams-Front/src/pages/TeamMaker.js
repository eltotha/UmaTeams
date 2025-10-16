  import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import Navbar from "../components/NavBar";
  import Background from "../assets/HomeBackground.jpg";
  import UmaTeamsLogo from "../assets/UmaTeamsLogo.png";
  import {
    Header,
    Logo,
    TrCardCenter,
    Card,
    ButtonContainer,
    BtConfirm,
    BtCancel,
    CharacterCard,
    CharacterName,
    CharactersGrid,
    TrCardGrid,
    SearchInput,
    TeamCard,
    CharacterCardLarge,
    CharactersGridSmall
  } from "../components/DefaultStyles";
  import FooterBar from "../components/Footer";

  // Contenedor principal con overlay
  const PageContainerWithOverlay = styled.div`
    background: 
      linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)),
      url(${Background}) no-repeat center top;
    background-size: contain;
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

  // Imagen de fondo
  const BackgroundImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: -1;
  `;

  function TeamMaker() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [teamName, setTeamName] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    const [allCharacters, setAllCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // === Cargar todos los personajes al inicio ===
    useEffect(() => {
      const fetchCharacters = async () => {
        try {
          const response = await fetch("http://localhost:5045/Uma/List");
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();

          let characters = [];
          if (Array.isArray(data)) {
              characters = data;
          } else if (Array.isArray(data.$values)) {
              characters = data.$values;
          } else {
              console.warn("Respuesta de API inesperada:", data);
          }

          setAllCharacters(characters);
        } catch (err) {
          console.error("Error cargando personajes:", err);
        }
      };
      fetchCharacters();
    }, []);

    // === Filtrar personajes según searchTerm ===
    const filteredCharacters = searchTerm
      ? allCharacters.filter(c =>
          c.name_en.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

    // === Cargar equipos ===
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:5045/UmaTeam/List");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        let teamsArray = [];
        if (Array.isArray(data)) {
          teamsArray = data;
        } else if (Array.isArray(data.teams)) {
          teamsArray = data.teams;
        } else if (Array.isArray(data.$values)) {
          teamsArray = data.$values;
        } else {
          console.warn("Respuesta de API inesperada:", data);
        }

        setTeams(teamsArray);
      } catch (err) {
        setError(err.message);
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchTeams();
    }, []);

    if (loading) return <p style={{ textAlign: "center" }}>Cargando datos...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

    // === Selección de personajes ===
    const toggleMember = (char) => {
      const realId = char.id; 
      setSelectedMembers(prev => {
        const exists = prev.find(m => m.id === realId);
        if (exists) return prev.filter(m => m.id !== realId);
        return [...prev, { id: realId, name: char.name_en, thumb: char.thumb_img }];
      });
    };

    // === Crear equipo con miembros ===
    const crearEquipo = async () => {
      if (!teamName.trim()) {
        alert("⚠️ Debes ingresar un nombre de equipo.");
        return;
      }
      if (selectedMembers.length === 0) {
        alert("⚠️ Selecciona al menos un miembro.");
        return;
      }

      try {
        const createResponse = await fetch("http://localhost:5045/UmaTeam/Create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teamName }),
        });

        if (!createResponse.ok) {
          const errData = await createResponse.json();
          alert(`❌ Error creando equipo: ${errData.message}`);
          return;
        }

        const createdTeam = await createResponse.json();
        const teamId = createdTeam.teamId;

        for (const member of selectedMembers) {
          const { id } = member;
          const memberResponse = await fetch("http://localhost:5045/UmaTeam/AddMember", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ teamId, umaId: id }),
          });

          if (!memberResponse.ok) {
            const errData = await memberResponse.json();
            console.warn(`⚠️ No se pudo agregar ${member.name}: ${errData.message}`);
          }
        }

        alert(`✅ Equipo "${teamName}" creado con éxito`);
        setTeamName("");
        setSelectedMembers([]);
        setSearchTerm("");
        fetchTeams();

      } catch (error) {
        console.error("Error al crear el equipo:", error);
        alert("❌ Error inesperado al crear el equipo");
      }
    };

    // === Eliminar equipo ===
    const eliminarEquipo = async () => {
      if (!deleteId) {
        alert("⚠️ Debes ingresar un ID de equipo para eliminarlo.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5045/UmaTeam/Delete", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Id: parseInt(deleteId) }),
        });

        const data = await response.json();

        if (response.ok) {
          alert(`🗑️ ${data.message}`);
          setDeleteId("");
          fetchTeams();
        } else {
          alert(`❌ Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error al eliminar el equipo:", error);
      }
    };

    return (
      <>
        <Navbar />
        <PageContainerWithOverlay>
          <BackgroundImg src={Background} />

          <TrCardCenter>
            <Header>
              <Logo src={UmaTeamsLogo} />
            </Header>
          </TrCardCenter>

          <TrCardGrid style={{ marginTop: "40px" }}>
            {/* FORMULARIO CREAR EQUIPO */}
            <Card style={{ marginTop: "50px" }}>
              <h3>Crear nuevo equipo UMA</h3>
              <input
                type="text"
                placeholder="Nombre del equipo"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", marginTop: "10px" }}
              />

              <SearchInput
                type="text"
                placeholder="Buscar personajes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginTop: "10px" }}
              />

              {searchTerm && (
                <CharactersGrid>
                  {filteredCharacters.map((char) => (
                    <CharacterCard
                      key={char.id}
                      onClick={() => toggleMember(char)}
                      $borderColor={selectedMembers.find(m => m.id === char.id) ? "#ff66b2" : "#ccc"}
                      style={{ cursor: "pointer", opacity: selectedMembers.find(m => m.id === char.id) ? 0.7 : 1 }}
                    >
                      <CharacterName>{char.name_en}</CharacterName>
                      {char.thumb_img && <img src={char.thumb_img} alt={char.name_en} style={{ width: "80px", height: "80px" }} />}
                    </CharacterCard>
                  ))}
                </CharactersGrid>
              )}

              {selectedMembers.length > 0 && (
                <div style={{ marginTop: "15px" }}>
                  <strong>Miembros seleccionados:</strong>
                  <ul>
                    {selectedMembers.map(m => (
                      <li key={m.id}>{m.name} (ID: {m.id})</li>
                    ))}
                  </ul>
                </div>
              )}

              <ButtonContainer>
                <BtConfirm onClick={crearEquipo}>Crear Equipo</BtConfirm>
                <BtCancel onClick={() => { setTeamName(""); setSelectedMembers([]); setSearchTerm(""); }}>Cancelar</BtCancel>
              </ButtonContainer>
            </Card>

            {/* FORMULARIO ELIMINAR EQUIPO */}
            <Card>
              <h3>Eliminar equipo</h3>
              <input
                type="number"
                placeholder="ID del equipo"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", width: "100%", marginTop: "10px" }}
              />
              <ButtonContainer>
                <BtCancel onClick={eliminarEquipo}>Eliminar</BtCancel>
              </ButtonContainer>
            </Card>

            {/* LISTADO DE EQUIPOS */}
            <div style={{ marginTop: "20px", width: "100%" }}>
              {teams.length > 0 ? (
                teams.map((team) => (
                  <TeamCard key={team.id}>
                    <h3 style={{ fontSize: "1rem" }}>{team.teamName}</h3>
                    <p style={{ fontSize: "0.8rem" }}><strong>ID:</strong> {team.id}</p>

                    {Array.isArray(team.teamMembers) && team.teamMembers.length > 0 ? (
                      <CharactersGridSmall>
                        {team.teamMembers.map((member) => (
                          <CharacterCardLarge
                            key={member.id}
                            $borderColor={member.characterInfo?.color_main || "#ccc"}
                          >
                            <CharacterName style={{ fontSize: "0.7rem" }}>{member.umaName}</CharacterName>
                            {member.characterInfo?.thumb_img && (
                              <img src={member.characterInfo.thumb_img} alt={member.umaName} />
                            )}
                          </CharacterCardLarge>
                        ))}
                      </CharactersGridSmall>
                    ) : (
                      <p style={{ color: "#888", fontSize: "0.7rem" }}>Sin miembros registrados.</p>
                    )}
                  </TeamCard>
                ))
              ) : (
                <p style={{ textAlign: "center", marginTop: "20px", fontSize: "0.9rem" }}>No hay equipos creados.</p>
              )}
            </div>
          </TrCardGrid>

        </PageContainerWithOverlay>
        <FooterBar />
      </>
    );
  }

  export default TeamMaker;
