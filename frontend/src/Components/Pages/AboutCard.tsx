// Libraries
import { ReactElement, ReactNode } from "react";

// Styles
import st from "./About.module.css";

// Props
interface Props {
    icon: ReactElement,
    children: ReactNode
}

const AboutCard = ({ icon, children }: Props) => {
    return (
        <div className={st.about__card}>
            <div className={st.about__card__head}>
                <span className="material-icons">
                    { icon }
                </span>
            </div>
            <div className={st.about__card__body}>
                { children }
            </div>
        </div>
    )

}

export default AboutCard;