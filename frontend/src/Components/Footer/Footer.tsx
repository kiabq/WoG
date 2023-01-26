// Styles
import st from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={st.footer}>
            <div className={`${st.footer__content} pd6-top`}>
                <div className={st.footer__info}>
                    <section className={st.footer__socials}>
                        <h2 className={`${st.footer__info__header}`}>Socials</h2>
                        <a href="/">Discord</a>
                        <a href="/">Twitch</a>
                    </section>
                    <section className={st.footer__contact}>
                        <h2 className={`${st.footer__info__header}`}>Contact</h2>
                        <a>Contact Me</a>
                    </section>
                </div>
                <p>&copy; Filler 2022</p>
            </div>
        </footer>
    )
}

export default Footer;