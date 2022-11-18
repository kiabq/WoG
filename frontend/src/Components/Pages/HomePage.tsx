// Libraries
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import About from "./About";
import Scheduler from "../Scheduler/Scheduler";

// Styles
import st from "./Home.module.css";
import gb from "../../globals.module.css"

// Hooks
import { useAuth } from "../../hooks/useProvider";
import { useAcct } from "../../hooks/useAccount";

const HomePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
        <main className={st.main__container__content}>
            <div className={`${st.main__container__bg}`}>
                <h1 className="rb_bld_h1">The World of Gaian</h1>
                <div className={st.main__container__buttons}>
                    <a href="#schedule" className={`${st.main__container__button} ${st.main__container__button__schedule}`}>
                        <button>
                            Game Times
                        </button>
                    </a>
                    {!auth?.token && 
                        <a href={`${process.env.REACT_APP_BACKEND_URL}/api/connect/discord`}>
                            <button className={`${st.main__container__button} ${st.main__container__button__signin}`}>
                                Sign in
                            </button>
                        </a>
                    }
                    {auth?.token && 
                        <Link to="/lore" className={`${st.main__container__button} ${st.main__container__button__schedule}`}>
                            <button>
                                Lore
                            </button>
                        </Link>
                    }
                </div>
            </div>
            
            <About/>
            <Scheduler/>
        </main>
    )
}

export default HomePage;