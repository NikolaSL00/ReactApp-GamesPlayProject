import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import CreateGame from './components/createGame/CreateGame';
import Catalogue from './components/catalogue/Catalogue';
import GameDetails from './components/gameDetails/GameDetails';

import { AuthProvider } from "./contexts/AuthContext";
import { GameContext } from './contexts/GameContext';
import * as gameService from "./services/gameService";
import { EditGame } from './components/editGame/EditGame';


function App() {
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
        <AuthProvider >
            <div id="box">
                <Header />

                <main id="main-content">
                    <GameContext.Provider value={{ games, gameAdd, gameEdit, setGames, gameDelete }}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/create' element={<CreateGame />} />
                            <Route path='/catalogue' element={<Catalogue />} />
                            <Route path='/edit/:gameId' element={<EditGame />} />
                            <Route path='/game/:gameId' element={<GameDetails />} />
                        </Routes>
                    </GameContext.Provider>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
