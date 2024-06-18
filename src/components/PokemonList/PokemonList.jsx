import "./PokemonList.css";
import PokemonCard from "../pokemonCard/PokemonCard";
import { PulseLoader } from "react-spinners";
import usePokemonList from "../../hooks/usePokemonList";

export default function PokemonList() {
   
    const { pokemonListState, setPokemonListState } = usePokemonList();

    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
                { 
                    (pokemonListState.isLoading) ? <PulseLoader color="#b2b2b2" /> :
                    pokemonListState.pokemonList.map((p) => 
                        <PokemonCard name={p.name} image={p.image} key={p.id} 
                        id={p.id}/> 
                    ) 
                }
            </div>
            <div className="controls">
                <button 
                    disabled={ pokemonListState.prevUrl == null } 
                    onClick={ () => {
                        const urlToSet = pokemonListState.prevUrl;
                        setPokemonListState({...pokemonListState, pokedexUrl: urlToSet})
                    }}
                >Prev</button>
                <button
                    disabled={ pokemonListState.nextUrl == null }
                    onClick={ () => {
                        const urlToSet = pokemonListState.nextUrl;
                        setPokemonListState({...pokemonListState, pokedexUrl: urlToSet}) 
                    }}
                >Next</button>
            </div>
        </div>
    )
}