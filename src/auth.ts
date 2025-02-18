import { AuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


const authOptions: AuthOptions = {

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
            authorization: {
                params: {
                    scope: "read:user user:email",
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            console.log('jwt called :: ', { token, account, profile })
            if (account) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.id = profile.id;
                token.name = profile.name;
                token.email = profile.email;
                token.image = profile.avatar_url;
            }
            return token;
        },
        async session({ session, token }) {
            console.log('session called : ', { session, token })
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.image;
            return session;
        }
    },
    // debug: true
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }