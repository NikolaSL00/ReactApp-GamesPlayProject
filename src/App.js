import './App.css';

import { Route, Routes } from "react-router-dom";
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import CreateGame from './components/createGame/CreateGame';
import Catalogue from './components/catalogue/Catalogue';
import GameDetails from './components/gameDetails/GameDetails';


function App() {
    return (
        <div id="box">
            <Header />
            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
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
    );
}

export default App;
