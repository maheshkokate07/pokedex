import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonDetails(id, pokemonName) {
    const [pokemonDetails, setPokemonDetails] = useState({
        pokemon: {},
        isLoading: true,
        sameTypePokemons: []
    });

    async function getPokemonDetails(id, searchTerm) {
        setPokemonDetails((state) => ({ ...state, isLoading: true }));

        let response;

        try {
            if (pokemonName) {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            } else {
                response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            }

            setPokemonDetails((state) => ({
                ...state,
                pokemon: {
                    name: response.data.name,
                    image: response.data.sprites.other.dream_world.front_default,
                    weight: response.data.weight,
                    height: response.data.height,
                    types: response.data.types.map((t) => t.type.name)
                }
            }))

            if (response.data.types) {
                const sameTypeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types[0].type.name}`)
                const sameTypePokemons = sameTypeResponse.data.pokemon.slice(0, 7).map(p => p.pokemon);
                setPokemonDetails((state) => ({
                    ...state,
                    sameTypePokemons,
                    isLoading: false,
                }))
            }
        } catch {
            console.log("Something went wrong");
        }
    }

    useEffect(() => {
        getPokemonDetails(id);
    }, [id]);

    return { pokemonDetails };
}

export default usePokemonDetails;