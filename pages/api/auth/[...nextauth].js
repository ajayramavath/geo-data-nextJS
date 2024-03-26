
import { data } from "autoprefixer";
import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from "next-auth/react";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: "309038945100-e09f3lgmj7cs9t4pf8thbq8atc2imr0q.apps.googleusercontent.com",
            clientSecret: "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"
        }),
    ],
    callbacks: {
        async signIn({user,account}){
            const {name,email} = user
            if(account.provider === 'google'){
                try {
                    const res = await fetch(process.env.NEXTAUTH_URL+"api/signin",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email
                    })
                   })
                   if(res.ok){
                       try {
                           const response = await fetch(process.env.NEXTAUTH_URL + "/api/getUser/"+email, {
                               method: "GET",
                               headers: {
                                   "content-Type": "application/json"
                               },
                           })
                           if (response.ok) {
                               console.log(response.data)
                           }
                       } catch (error) {
                           console.log(error)
                       }
                    return user; }
                } catch (error) {
                    console.log(error)
                }
            }
            console.log(user)
            return user;
        },
        async session ({session}){
            const {email} = session.user;
            try {
                const response = await fetch(process.env.NEXTAUTH_URL+"/api/getUser/"+email)
                const res = await response.json()
                session.user._id = res.id
            } catch (error) {
                console.log(error)
            }
            return session
        }
       
    }
}

export default NextAuth(authOptions);