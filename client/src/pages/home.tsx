import {PrimaryButton} from "../components/buttons";
import "./home.css"

const Home = () => {
    return (
        <div className="fullwidth">
            <div className="container fade-page">
                <div className="hero-banner">
                    <div className="hero-txt-area">
                        <h1>Guess the Number</h1>
                        <p>Signup to play</p>
                    </div>
                    <PrimaryButton value="Signup" to="/signup" />
                </div>
            </div>
        </div>
    );
}

export default Home;

