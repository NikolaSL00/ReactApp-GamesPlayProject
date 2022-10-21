import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import * as commentService from "../../services/commentService";
import * as gameService from '../../services/gameService';
import Comment from "./Comment";
import { GameContext } from "../../contexts/GameContext";
import { AuthContext } from "../../contexts/AuthContext";

const GameDetails = () => {
    const navigate = useNavigate();
    const { gameId } = useParams();

    const { games } = useContext(GameContext);
    const { user } = useContext(AuthContext);

    const [game, setGame] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const { gameDelete } = useContext(GameContext);

    useEffect(() => {
        games.map(x => {
            if (x._id === gameId) {
                setGame(x);
            }
        });
    }, [gameId]);

    useEffect(() => {
        commentService.getAllPopulatedWithAuthor(gameId)
            .then(allComments => {
                setComments(allComments);
            });
    }, []);

    const deleteHandler = (e) => {
        const confirmation = window.confirm("Are you sure you want to delete this game?");
        if (confirmation) {
            gameService.del(gameId)
                .then(res => {
                    gameDelete(gameId);
                    navigate('/catalogue');
                });
        }
    }
    const onChangeHandler = (e) => {
        setComment(state => e.target.value);
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        const { comment } = Object.fromEntries(new FormData(e.target));
        setComment(state => '');

        commentService.create({ gameId, comment })
            .then(result => {
                result.user = user;
                setComments(comments => [
                    ...comments,
                    result
                ]);
            })
    };

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
                            ? comments.map(x => <Comment key={x._id} comment={x} />)
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
                        <button onClick={deleteHandler} className="button">
                            Delete
                        </button>
                    </div>
                }


            </div>

            {user.email && <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={onSubmitHandler}>
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChangeHandler}
                        value={comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        defaultValue="Add Comment"
                    />
                </form>
            </article>}

        </section>
    );
};

export default GameDetails;