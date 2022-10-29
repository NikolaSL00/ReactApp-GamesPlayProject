import { useContext } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext";

export const GameOwner = ({
    children
}) => {

    const { gameId } = useParams();
    const { user } = useContext(AuthContext);
    const { selectGame } = useContext(GameContext);
    const navigate = useNavigate();

    const currentGame = selectGame(gameId);

    if (user._id !== currentGame._ownerId) {
        return navigate('/catalogue', { replace: true });
    }

    return children ? children : <Outlet />;
} 