import { useEffect, useState } from "react";
import { PokemonCard } from "../types";
import { styled } from "styled-components";

const PokemonCardDiv = styled.div`
    max-width: 18rem; 
    min-width: 15rem;
    margin: 1rem;
    padding: 1rem;
    width: 20rem;
    background-color: lightblue;
    border-radius: 10px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: scale(1.05); 
        box-shadow: 0 4px 8px black; 
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 1rem;
`;

const PokemonCardComponent = ({ card }: { card: PokemonCard }) => {
    return (
        <PokemonCardDiv>
            <h3>{card.name}</h3>
            <img src={card.image} alt={card.name} />
            <p>Type: {card.types.join(", ")}</p>
            <p>Rarity: {card.rarity}</p>
            <p>Set: {card.set}</p>
        </PokemonCardDiv>
    );
};

export default function PokemonList() {
    const [numCards, setNumCards] = useState(5);
    const [cards, setCards] = useState<PokemonCard[]>([]);

    useEffect(() => {
        async function getPokemonCards() {
            const res = await fetch(`https://api.pokemontcg.io/v2/cards?pageSize=${numCards}`);
            const data = await res.json();
            
            const pokemonCards = data.data.map((card: { id: string; name: string; images: { small: string }; types: string[]; rarity: string; set: { name: string } }) => ({
                id: card.id,
                name: card.name,
                image: card.images.small,
                types: card.types,
                rarity: card.rarity,
                set: card.set.name,
            }));
            setCards(pokemonCards);
        }
        getPokemonCards();
    }, [numCards]);
    
    return (
        <div>
            <input type="number" placeholder="Number of Cards" value={numCards}
                onChange={(e) => setNumCards(Number(e.target.value))} />

            <CardContainer>
                {cards.map(card => <PokemonCardComponent key={card.id} card={card} />)}
            </CardContainer>
        </div>
    );
}
