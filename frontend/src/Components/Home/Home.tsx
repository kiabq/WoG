// Libraries
import React, { SetStateAction, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import Nav from "../Navbar/Nav";
import Scheduler from "../Scheduler/Scheduler";

// Styles
import styles from './Home.module.css';

// Hooks
import { ConsumeAuth, useAuth } from "../../hooks/useProvider";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.main__content}>
            <Nav/>
            <main>
                <div className={styles.content}>
                    <h1>The World of Gaian</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga nemo praesentium quidem distinctio ullam rem cumque, veniam repudiandae deleniti dignissimos fugit nisi, eaque odit laboriosam labore? Earum, nam amet possimus modi architecto repellat debitis reiciendis, commodi corrupti est laudantium iusto assumenda, cupiditate labore totam tenetur impedit ut nostrum perspiciatis quia cumque facere. Esse rerum adipisci rem sequi. Harum corrupti saepe molestiae possimus rem eius eum error incidunt mollitia explicabo soluta, beatae voluptatibus odit fugiat quam eligendi dolore minus dolor aliquam cumque, itaque in laudantium aperiam. Omnis molestiae est, nobis aspernatur doloremque nisi nam impedit ea rem recusandae architecto eius praesentium?</p>
                    <button>Sign Up</button>

                    <Scheduler />
                </div>
            </main>
            <footer className={styles.footer}>
                <p>Contact</p>
                <p>Twitch</p>
                <p>&copy; Filler 2022</p>
            </footer>
        </div>
    )
}

export default Home;