import { useEffect, createContext, useReducer } from "react";
import * as gameService from "../services/gameService";

export const GameContext = createContext({ games: [] });

const gameReducer = (state, action) => {
    switch (action.type) {
        case "ADD_GAMES":
            return [
                ...action.payload
            ];

        case "ADD_GAME":
            return [
                ...state,
                action.payload
            ];

        case "EDIT_GAME":
            return [
                state.map(x => x._id == action.gameId ? action.payload : x)
            ];

        case "DELETE_GAME":
            return [
                state.filter(x => x._id !== action.gameId)
            ];

        default:
            return [...state];
    }
}

export const GameProvider = ({
    children,
}) => {
    const [games, gameDispatcher] = useReducer(gameReducer, []);

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                gameDispatcher({
                    type: 'ADD_GAMES',
                    payload: result,
                });
            });
    }, []);
    const refreshGames = () => {
        gameService.getAll()
            .then(result => {
                gameDispatcher({
                    type: 'ADD_GAMES',
                    payload: result,
                });
            });
    }
    const gameAdd = (gameData) => {
        gameDispatcher({
            type: 'ADD_GAME',
            payload: gameData,
        });
    }
    const gameEdit = (gameId, gameData) => {
        gameDispatcher({
            type: 'EDIT_GAME',
            payload: gameData,
            gameId,
        });
    }
    const gameDelete = (gameId) => {
        gameDispatcher({
            type: 'DELETE_GAME',
            gameId,
        });
    }

    return (
        <GameContext.Provider value={{ games, gameAdd, gameEdit, gameDelete, refreshGames }}>
            {children}
        </GameContext.Provider>
    );
};