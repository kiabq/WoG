// Components
import AboutCard from "./AboutCard";

// Styles
import st from "./About.module.css";
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';

const About = () => {
    return (
        <div className={st.about}>
            <div className={st.about__card__container}>
                <AboutCard icon={<PublicRoundedIcon sx={{ fontSize: 65, color: "#ffffff" }}/>}>
                        <h3 className="ub_reg_h3">What is the World of Gaian?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam et harum quasi rem quas eius accusamus error impedit nihil minima placeat, similique cumque aspernatur totam?</p>
                </AboutCard>
                <AboutCard icon={<PlayArrowRoundedIcon sx={{ fontSize: 80, color: "#ffffff" }}/>}>
                        <h3 className="ub_reg_h3">How do I start?</h3>
                        <ul className={st.about__card__list}>
                            <li>Login with your Discord account</li>
                            <li>Customize your account information</li>
                        </ul>
                </AboutCard>
                <AboutCard icon={<QuestionMarkRoundedIcon sx={{ fontSize: 65, color: "#ffffff" }}/>}>
                        <h3 className="ub_reg_h3">What next?</h3>
                        <ul className={st.about__card__list}>
                            <li>Join the Discord server</li>
                            <li>Wait for a DM to contact you</li>
                        </ul>
                </AboutCard>
            </div>
        </div>
    )
}

export default About;