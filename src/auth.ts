import { AuthOptions, getServerSession } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


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
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { 
					label: "Email", 
					type: "email", 
					placeholder: "Enter your email" 
				},
				password: { 
					label: "Password", 
					type: "password" 
				}
			},
			async authorize(credentials, req) {
				const { email, password } = credentials
				if (email === "test@example.com" && password === "password123") {
					return { id: "1", name: "Test User", email };
				}
				throw new Error("Invalid email or password");
			}
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	callbacks: {
		async jwt({ token, account, profile }) {
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
			session.user.id = token.id;
			session.user.name = token.name;
			session.user.email = token.email;
			session.user.image = token.image;
			return session;
		}
	},
	pages: {
		signIn: '/auth/signin',
	}
	// debug: true
}

const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }