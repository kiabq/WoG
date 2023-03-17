// Libraries
import { GetServerSideProps } from "next";
import Cookies from "cookies";

// Components
import Redirect from "../../components/Redirect";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const cookies = new Cookies(req, res);

    if (cookies.get('token')) {
        cookies.set('token', null, {
            maxAge: 0,
            path: '/'
        });
    }

    return {
        props: {}
    }
}

export default function Logout() {
    return <Redirect />
}