import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


import * as commentService from "../../services/commentService";
import Comment from "./Comment";
import { GameContext } from "../../contexts/GameContext";
import { AuthContext } from "../../contexts/AuthContext";

const GameDetails = () => {
    const { games } = useContext(GameContext);
    const { gameId } = useParams();
    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        games.map(x => {
            if (x._id === gameId) {
                setGame(x);
            }
        });
    }, [gameId]);

    useEffect(() => {
        commentService.getAllComments(gameId)
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

                {
                    user._id === game._ownerId &&
                    <div className="buttons">
                        <Link to={`/edit/${gameId}`} className="button">
                            Edit
                        </Link>
                        <Link to={`/delete/${gameId}`} className="button">
                            Delete
                        </Link>
                    </div>
                }


            </div>
            {/* <article className="create-comment">
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
            </article> */}
        </section>
    );
};

export default GameDetails;