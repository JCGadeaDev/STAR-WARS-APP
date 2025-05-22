import { useState, useEffect } from "react";
import { getCharacters } from "../services/swapiService";
import CharacterCard from "../components/CharacterCard";

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getCharacters(currentPage);
        setCharacters(data.results);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [currentPage]);

  const handleNextPage = () => {
    if (pageInfo.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageInfo.previous) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  if (loading) {
    return <div className="loading">Loading Characters...</div>;
  }
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <div className="card-grid">
        {characters.map((character) => (
          <CharacterCard key={character.url}
          character={character}
          />
        ))}
      </div>
      <div className="page-controls">
        <button
          className="btn"
          onClick={handlePreviousPage}
          disabled={!pageInfo.previous}
          style={{ opacity: pageInfo.previous ? 1 : 0.5 }}
        >
          Previous Page
        </button>
        <span>Page {currentPage}</span>
        <button
          className="btn"
          onClick={handleNextPage}
          disabled={!pageInfo.next}
          style={{ opacity: pageInfo.next ? 1 : 0.5 }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default CharacterList;
