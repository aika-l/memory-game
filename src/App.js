import React, { useEffect, useState } from "react";
import "./style.css";

const url = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

export default function App() {
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);

  const pokemons = [
    { id: 207, name: "Gligar" },
    { id: 179, name: "Mareep" },
    { id: 352, name: "Kecleon" },
    { id: 312, name: "Minun" },
    // {id: 111, name: "Rhyhorn"},
    // {id: 182, name: "Bellossom"}
  ];

  //currently there are 4 pokemons but we need the pair

  const pairOfPokemons = [...pokemons, ...pokemons];

  function flipCard(index) {
    setOpenedCard((opened) => [...opened, index]);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfPokemons[openedCard[0]];
    const secondMatched = pairOfPokemons[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);

  return (
    <div className="App">
      <div className="cards">
        {pairOfPokemons.map((pokemon, index) => {

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;
          return (
            <div
              className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src={`${url}/${pokemon.id}.png`}
                    alt="pokemon-name"
                    width="100"
                  />
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}