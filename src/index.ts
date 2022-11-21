import dotenv from "dotenv"
dotenv.config();
import 'reflect-metadata';
import express from 'express';
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import {resolvers} from "./resolvers"
import { User } from "./schema/user.schema"
import Context from "./types/context"
import connnectToMongo from "./utils/mongo"
import { verifyJwt } from "./utils/jwt";
import authChecker from './utils/authChecker'

async function bootstrap(){
    //Build schema
const schema = await buildSchema({
    resolvers,
    authChecker
})
    //Init express
const app = express()

app.use(cookieParser())

    // Create apollo server
const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
        const context = ctx

        if(ctx.req.cookies.accessToken) {
            const user = verifyJwt<User>(ctx.req.cookies.accessToken)
            
            context.user = user
        }
        console.log(ctx)
        return ctx
    },
    plugins: [
        process.env.NODE_ENV === 'production' ? 
        ApolloServerPluginLandingPageProductionDefault() :
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})
    // await server.start()
await server.start();

    //apply middleware to server
server.applyMiddleware({app})
    //app.listen on express server

    app.listen( {port:4000}, () => {
        console.log("App is listening on http://localhost:4000")
    });
    //connect to db
    connnectToMongo();
}

bootstrap();