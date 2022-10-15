import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as gameService from "../../services/gameService";
import Comment from "./Comment";

const GameDetails = () => {

    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        gameService.getGameDetails(gameId)
            .then(detailedGame => setGame(detailedGame));
    }, []);

    useEffect(() => {
        gameService.getAllComments(gameId)
            .then(allComments => setComments(allComments));
    }, []);

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game?.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game?.maxLevel}</span>
                    <p className="type">{game?.category}</p>
                </div>
                <p className="text">
                    {game?.summary}
                </p>

                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.length > 0
                            ? comments.map(x => <Comment comment={x} />)
                            : <p className="no-comment">No comments.</p>
                        }
                    </ul>
                </div>
                <div className="buttons">
                    <a href="#" className="button">
                        Edit
                    </a>
                    <a href="#" className="button">
                        Delete
                    </a>
                </div>
            </div>
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form">
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        defaultValue={""}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>
        </section>
    );
};

export default GameDetails;