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

import { AuthContext } from "./contexts/AuthContext";
import { useState } from 'react';


function App() {
    const [auth, setAuth] = useState({});

    const userLogin = (authData) => {
        //there the access to the authState can be controlled
        // so we do not pass the pure setAuth to the Context
        // the change of the state of the app component should happen in the APP COMPONENT
        setAuth(authData);
    }

    const userLogout = (authData) => {
        setAuth({});
    }

    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            <div id="box">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/create' element={<CreateGame />} />
                        <Route path='/catalogue' element={<Catalogue />} />
                        <Route path='/game/:gameId' element={<GameDetails />} />
                    </Routes>

                </main>
                {/* Edit Page ( Only for the creator )*/}
                {/* <section id="edit-page" className="auth">
                <form id="edit">
                    <div className="container">
                        <h1>Edit Game</h1>
                        <label htmlFor="leg-title">Legendary title:</label>
                        <input type="text" id="title" name="title" defaultValue="" />
                        <label htmlFor="category">Category:</label>
                        <input type="text" id="category" name="category" defaultValue="" />
                        <label htmlFor="levels">MaxLevel:</label>
                        <input
                            type="number"
                            id="maxLevel"
                            name="maxLevel"
                            min={1}
                            defaultValue=""
                        />
                        <label htmlFor="game-img">Image:</label>
                        <input type="text" id="imageUrl" name="imageUrl" defaultValue="" />
                        <label htmlFor="summary">Summary:</label>
                        <textarea name="summary" id="summary" defaultValue={""} />
                        <input className="btn submit" type="submit" defaultValue="Edit Game" />
                    </div>
                </form>
            </section> */}
            </div>
        </AuthContext.Provider>
    );
}

export default App;
