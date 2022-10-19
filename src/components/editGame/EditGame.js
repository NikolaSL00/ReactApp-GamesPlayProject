import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";

import * as gameService from "../../services/gameService";

export const EditGame = () => {
    const [currentGame, setCurrentGame] = useState({});
    const { gameId } = useParams();
    const navigate = useNavigate();
    const { gameEdit } = useContext(GameContext);

    useEffect(() => {
        gameService.getDetails(gameId)
            .then(res => {
                setCurrentGame(res);
            });
    }, []);

    const onEdit = (e) => {
        e.preventDefault();

        const gameData = Object.fromEntries(new FormData(e.target));

        gameService.edit(gameId, gameData)
            .then(result => {
                gameEdit(gameId, result);
                navigate(`/catalogue`);
            });
    }

    return (
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={onEdit}>
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" defaultValue={currentGame.title} />
                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" defaultValue={currentGame.category} />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input
                        type="number"
                        id="maxLevel"
                        name="maxLevel"
                        min={1}
                        defaultValue={currentGame.maxLevel}
                    />
                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" defaultValue={currentGame.imageUrl} />
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" defaultValue={currentGame.summary} />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    );
}