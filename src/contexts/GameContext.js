import { createContext, useEffect, useState } from "react";

import * as gameService from '../services/gameService';
export const GameContext = createContext({ games: [] });

export const GameProvider = ({
    children
}) => {
    const [games, setGames] = useState([]);

    const gameAdd = (gameData) => {
        setGames(games => ([
            ...games,
            gameData
        ]));
    }
    const gameEdit = (gameId, gameData) => {
        setGames(state => [
            state.map(x => x._id === gameId ? gameData : x)
        ]);
    }
    const gameDelete = (gameId) => {
        setGames(state => ([
            state.filter(x => x._id !== gameId)
        ]));
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);
    return (
        <GameContext.Provider value={{ games, gameAdd, gameEdit, setGames, gameDelete }}>
            {children}
        </GameContext.Provider>
    );
}