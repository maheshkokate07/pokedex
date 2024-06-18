import { Link } from "react-router-dom"
import "./PokemonCard.css"

export default function PokemonCard({name, image, id}) {
    return (
        <div className="pokemon-card">
            <Link to={`/pokemon/${id}`}>
                <div>
                    <img id="pokemon-img" src={image} alt="Pokemon Image" />
                </div>
            </Link>
            <div>{ name }</div>
        </div>
    )
}