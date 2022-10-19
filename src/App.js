import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout';
import CreateGame from './components/createGame/CreateGame';
import Catalogue from './components/catalogue/Catalogue';
import GameDetails from './components/gameDetails/GameDetails';

import { AuthContext } from "./contexts/AuthContext";
import { GameContext } from './contexts/GameContext';
import { useLocalStorage } from "./hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from './config/constants';
import * as gameService from "./services/gameService";
import { EditGame } from './components/editGame/EditGame';


function App() {
    const [auth, setAuth] = useLocalStorage(LOCAL_STORAGE_KEY, {});
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const userLogin = (authData) => {
        //there the access to the authState can be controlled
        // so we do not pass the pure setAuth to the Context
        // the change of the state of the app component should happen in the APP COMPONENT
        setAuth(authData);
    }
    const userLogout = () => {
        setAuth({});
    }
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

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                setGames(result);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <GameContext.Provider value={{ games, gameAdd, gameEdit, setGames }}>
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
        </AuthContext.Provider>
    );
}

export default App;
