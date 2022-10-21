import { useEffect, useState } from "react"
import * as gameService from "../../services/gameService";
import LatestGame from "./latestGame/LatestGame";


const Home = () => {
    const [latest, setLatest] = useState([]);

    useEffect(() => {
        gameService.getLatest()
            .then(result => {
                setLatest(result.splice(0, 3));
            });
    }, []);

    return (
        <section id="welcome-world">
            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />
            <div id="home-page">
                <h1>Latest Games</h1>

                {latest.length > 0
                    ? latest.map(x => <LatestGame key={x._id} game={x} />)
                    : <p className="no-articles">No games yet</p>}

            </div>
        </section>
    );
};

export default Home;