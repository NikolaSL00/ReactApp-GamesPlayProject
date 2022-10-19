import { useContext, useEffect } from "react";
import { GameContext } from "../../contexts/GameContext";
import CatalogGame from "./game/CatalogGame";
import * as gameService from '../../services/gameService';

const Catalogue = () => {
    const { games, setGames } = useContext(GameContext);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {games.length > 0
                ? games.map(x => <CatalogGame key={x._id} game={x} />)
                : <h3 className="no-articles">No games yet</h3>
            }
        </section>
    );
}

export default Catalogue;