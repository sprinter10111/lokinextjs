import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../../appolo-client';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { convertContentToString } from '../../../utils/contentUtils';
import styles from '../../../styles/Character.module.css';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CharacterEntity} from '../../../gql/graphql';

const apolloClient = createApolloClient();

interface Paths extends ParsedUrlQuery {
  id: string
}


export const getStaticPaths : GetStaticPaths<Paths> = async () => {    
    const { data } = await apolloClient.query({
      query: gql`
      query {  
        characters{
            data{
                id  
            }
        }       
      }
      `,
    }); 
    const characters=data.characters.data; 
    const paths = characters.map((character:any) => ({
        params: { id: character.id.toString() },
    })); 

    return {
        paths: paths,
        fallback: false,
    };
};

interface PostsProps {
  character:CharacterEntity  
}
export const getStaticProps : GetStaticProps<PostsProps, Paths> = async (context) => {
  const characterId = context.params?.id;
  
  const { data } = await apolloClient.query({
    query: gql`
    query GetCharacter($characterId: ID!) {
      character(id: $characterId) {
        data {
          id
          attributes {
            name
            characterDetail
            characterPicture {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
    `,
    variables: {
      characterId,
    },
  });

  const character:CharacterEntity=data.character.data;


  return {
      props: {
        
        character:character     
      },
  };
};

    const CharacterDetails = ({character} :{character:CharacterEntity}) => {      

    return (
      <>   
       <div className={styles.characterContainer}>
      <h1>{character?.attributes?.name}</h1>
      <ReactMarkdown>{convertContentToString(character?.attributes?.characterDetail)}</ReactMarkdown>
      {character?.attributes?.characterPicture && (
        <img 
        className={styles.characterImage}
        src={"http://192.168.1.30:1337"+ character.attributes?.characterPicture?.data?.attributes?.url} 
        alt="Character Picture" />
      )}
    </div>
      </>
    )
  }


  export default CharacterDetails;