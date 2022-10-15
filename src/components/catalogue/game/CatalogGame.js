import { Link } from "react-router-dom";

const CatalogGame = ({
    game
}) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={`/game/${game._id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    );
}

export default CatalogGame;