// Libraries
import Cookies from "cookies";

// Components
import Redirect from "../../components/Redirect";

// Types
import type { GetServerSideProps } from "next";

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
    return <Redirect page='/'/>
}