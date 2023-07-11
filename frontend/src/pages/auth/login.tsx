// Libraries
import { serialize } from "cookie";

// Components
import Redirect from "../../components/Redirect";

// Types
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({
    query: { access_token },
    res
}) => {
    const user = await fetch(`${process.env.REACT_APP_BACKEND}/api/auth/discord/callback?access_token=${access_token}`)
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

            return response;
        })

    return {
        props: { user }
    }
}

export default function Login(props: any) {
    const { user } = props;

    if (user.isNew) {
        return <Redirect page={'/setup'} />
    } else {
        return <Redirect page={'/profile'} />
    }
}