// Libraries
import { Link} from "react-router-dom";

// Components
import About from "./About";
import Scheduler from "../Scheduler/Scheduler";

// Styles
import st from "./Home.module.css";

// Hooks
import { useAuth } from "../../hooks/useProvider";

const HomePage = () => {
    const auth = useAuth();

    return (
        <main className={st.main__container__content}>
            <div className={`${st.main__container__bg}`}>
                <div className={`${st.main__container__cover}`}>
                    <h1 className={`${st.main__container__title} rb_bld_h1 pd6-top`}>
                        The World of Gaian
                    </h1>
                    <div className={`${st.main__container__buttons} rb_bld_h3`}>
                        <a href="#schedule" className={`${st.main__container__button} ${st.main__container__button__schedule}`}>
                            <button>
                                SCHEDULE
                            </button>
                        </a>
                        {!auth?.token && 
                            <a href={`${process.env.REACT_APP_BACKEND}/api/connect/discord`}  className={`${st.main__container__button} ${st.main__container__button__signin}`}>
                                <button className="btn">
                                    SIGN IN WITH DISCORD
                                </button>
                            </a>
                        }
                        {auth?.token && 
                            <a href="" className={`${st.main__container__button} ${st.main__container__button__signin}`}>
                                <button className="btn">
                                    JOIN THE DISCORD
                                </button>
                            </a>
                        }
                </div>

                </div>
            </div>
            
            <About/>
            <Scheduler/>
        </main>
    )
}

export default HomePage;