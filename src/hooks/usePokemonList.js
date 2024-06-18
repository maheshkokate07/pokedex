import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonList() {
    const [pokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
        prevUrl: "",
        nextUrl: ""
    });

    async function getPokemons() {
        setPokemonListState((state) => ({...state, isLoading: true}));

        // GET the list of pokemons     
        const response = await axios.get(pokemonListState.pokedexUrl);

        setPokemonListState((state) => ({
            ...state, 
            prevUrl: response.data.previous, 
            nextUrl: response.data.next
        }));
        
        // We get the array of pokemons from the result
        const pokemonResults = response.data.results;

        // Iterating over the array of pokemons and using their url to create the array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

        // Passing that promise array to get info of all pokemons
        const pokemonData = await axios.all(pokemonResultPromise);
        

        // Now iterate on the data of each pokemon to extract their id, name, image and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other.dream_world.front_default,
                types: pokemon.types
            }
        })

        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult, 
            isLoading: false
        }));
    }

    useEffect(() => {
        getPokemons();
    }, [pokemonListState.pokedexUrl]);

    return { pokemonListState, setPokemonListState };
}

export default usePokemonList;