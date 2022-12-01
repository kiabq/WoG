// Styles
import st from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={st.footer}>
            <div className={`${st.footer__content} pd6-top`}>
                <div className={st.footer__info}>
                    <section>
                        <h2 className={`${st.footer__info__header}`}>Socials</h2>
                        <p>Discord</p>
                        <p>Twitch</p>
                    </section>
                    <section>
                        <h2 className={`${st.footer__info__header}`}>Contact</h2>
                        <p>Email me!</p>
                    </section>
                </div>
                <p>&copy; Filler 2022</p>
            </div>
        </footer>
    )
}

export default Footer;