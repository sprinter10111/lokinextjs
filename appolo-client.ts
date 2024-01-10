import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const createApolloClient = () => {
        
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://innovative-ducks-c3740bc2a8.strapiapp.com/graphql',
      headers: {
        Authorization: `Bearer ca85cb3bbf223c88b31c822b843ba41ab368d8bfb483c70e009dd986936b9e2183e634f013770d1e17960f41743c8aaa89061f43bf6b64acb04edbfb9a7129e38804877d9817d693208636c51ecdf771f2af14556ef22ffd096f8b6262b77600a99e194c2a3abc9cbd34ff10345ef30d3aa813fec2b6383d9808af967cb5b4c2`
      }
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;