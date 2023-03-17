// Libraries
import { GetServerSideProps } from "next";
import { serialize } from "cookie";

// Components
import Redirect from "../../components/Redirect";

export const getServerSideProps: GetServerSideProps = async ({
    query: { access_token },
    res
}) => {
    await fetch(`http://localhost:1337/api/auth/discord/callback?access_token=${access_token}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.jwt) {
                res.setHeader(
                    "Set-Cookie", [
                    serialize('token', response.jwt, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 30,
                        sameSite: 'lax',
                        path: '/'
                    })
                ]
                )
            }
        })
    return {
        props: {}
    }
}

export default function Logout() {
    return <Redirect />
}