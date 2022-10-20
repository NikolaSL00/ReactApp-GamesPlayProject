import './App.css';
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
import { GameProvider } from './contexts/GameContext';
import { EditGame } from './components/editGame/EditGame';


function App() {
    return (
        <AuthProvider >
            <div id="box">
                <Header />

                <main id="main-content">
                    <GameProvider>
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
                    </GameProvider>
                </main>
            </div>
        </AuthProvider>
    );
}

export default App;
