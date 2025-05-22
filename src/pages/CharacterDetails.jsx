import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCharacter } from "../services/swapiService";
import { Link } from "react-router-dom";

function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        setLoading(true);
        const data = await getCharacter(id);
        setCharacter(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacterDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading Character Information ...</div>;
  if (error || !character) return <div className="error-message">Error: {error || "Not found character"}</div>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <div className="detail-section">
        <h2>Personal information</h2>
        <div className="detail-grid">
          <div className="detail-item">
            <strong>Height: </strong>{character.height !== "unknown" ? `${character.height} cm` : "unknown"}
          </div>
          <div className="detail-item">
            <strong>Mass: </strong>{character.mass !== "unknown" ? `${character.mass} kg` : "unknown"}
          </div>
          <div className="detail-item">
            <strong>Hair Color: </strong>{character.hair_color !== "n/a" ? character.hair_color : "n/a"}
          </div>
          <div className="detail-item">
            <strong>Skin Color: </strong> {character.skin_color}
          </div>
          <div className="detail-item">
            <strong>Eye Color: </strong> {character.eye_color}
          </div>
          <div className="detail-item">
            <strong>Gender: </strong> {character.gender !== 'n/a' ? character.gender : 'n/a'}
          </div>
          <div className="detail-item">
            <strong>Birth Year: </strong> {character.birth_year !== 'unknown' ? character.birth_year : 'unknown'}
          </div>
        </div>
      </div>
      <div className="detail-section">
        <h2>Aditional Information</h2>
        <div className="detail-grid">
            <div className="detail-item">
                <strong>Films: </strong> {character.films.length}
            </div>
            <div className="detail-item">
                <strong>Vehicles: </strong> {character.vehicles.length}
            </div>
               <div className="detail-item">
                <strong>Starships: </strong> {character.starships.length}
            </div>
        </div>
      </div>
      <div className="back-btn">
        <Link to='/' className='btn'>Return to character list</Link>
      </div>
    </div>
  );
}

export default CharacterDetails;
