import { useContext } from "react";
import { Outlet, useParams, Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import { GameContext } from "../../contexts/GameContext";

export const GameOwner = ({
    children
}) => {

    const { gameId } = useParams();
    const { user } = useContext(AuthContext);
    const { selectGame } = useContext(GameContext);

    const currentGame = selectGame(gameId);

    if (user._id !== currentGame._ownerId) {
        return <Navigate to={'/catalogue'} replace/>;
    }

    return children ? children : <Outlet />;
} 