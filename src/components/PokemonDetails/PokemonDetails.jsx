import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import { PulseLoader } from "react-spinners";
import usePokemonDetails from "../../hooks/usePokemonDetails";

export default function PokemonDetails({ pokemonName }) {

    const { id } = useParams();

    const { pokemonDetails } = usePokemonDetails(id, pokemonName);

    return (
        <>
            {
                (pokemonDetails.isLoading) ?
                <div className="loader-wrapper"><PulseLoader color="#b2b2b2" /></div> :
                <>
                    <div className="pokemon-details-wrapper">
                        <img className="pokemon-img" src={pokemonDetails.pokemon.image} alt="" />
                        <div className="pokemon-name">{pokemonDetails.pokemon.name}</div>
                        <div className="pokemon-height">Height: {pokemonDetails.pokemon.height}</div>
                        <div className="pokemon-weigth">Weight: {pokemonDetails.pokemon.weight}</div>
                        {
                            pokemonDetails.pokemon.types &&
                            <div className="pokemon-types">
                                Type: {pokemonDetails.pokemon.types.map((t) => <span key={t}> {t} </span>)}
                            </div>
                        }
                    </div>
                    {
                        (pokemonDetails.sameTypePokemons) &&
                        <div className="same-types">
                            <h3>Some more {pokemonDetails.pokemon.types[0]} pokemons:</h3>
                            <div className="type-name">
                                {
                                    pokemonDetails.sameTypePokemons.map((p) => <div key={p.url}>{p.name}</div>)
                                }
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}