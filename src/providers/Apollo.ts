import {ApolloClient, HttpLink, InMemoryCache, from} from "@apollo/client"
import {onError} from "@apollo/client/link/error"


const httpLink = new HttpLink({uri: "https://graphql.anilist.co"})
const errorLink = onError(({graphQLErrors, networkError})=>{
    if (graphQLErrors){
        graphQLErrors.forEach(({message, locations, path})=>{
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )

        })
        if (networkError) console.error(`[Network error]: ${networkError}`);
    }
})
export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
})