import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const createApolloClient = () => {
        
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://192.168.1.30:1337/graphql',
      headers: {
        Authorization: `Bearer b8a1cc9f187e259832c17722dd6e2e1db8133292c6fdac4f72b639fdf335007ca42276ce17088337970e4467374ecd1a379c7ee847aa019370e2e6389927055a670a2fdfafe99b76ce3f2c59c7fa7b98425e4218b899a861d190065d2c7c52fd3ed9b835920a37119041a0074c9db7f68c6f4a7ba033f1569b226f24b62c0817`
      }
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;