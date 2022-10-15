import { useEffect, useState } from "react";
import * as gameService from "../../services/gameService";

import CatalogGame from "./game/CatalogGame";

const Catalogue = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(games => setGames(games));
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