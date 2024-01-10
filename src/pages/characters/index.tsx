import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../appolo-client';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../../utils/contentUtils';
import { CharacterEntity} from '../../gql/graphql';
import Link from 'next/link';
import { GetStaticProps } from "next";
import styles from '../../styles/Character.module.css';


const apolloClient = createApolloClient();



interface PostsProps {
  characters:CharacterEntity[] 
}

export const getStaticProps : GetStaticProps<PostsProps> = async () => {
  const { data } = await apolloClient.query({
    query: gql`
    query {
      characters{
          data{
              id
              attributes{
                  name
                  characterDetail
                 characterPicture{
                     data{
                        attributes{
                            url
                            
                        }
                     }
                 }
              }
          }
      }   
        
    }
    `,
  });   

  const characters:CharacterEntity[]=data.characters.data;


  return {
      props: {
        
        characters:characters      
      },
  };
};



export default function Characters({characters} :{characters:CharacterEntity[]}) {

    return (
      <>   
      {characters.map((character)=>
      <>
      <div key={character.id} className={styles.characterContainer}>
      <h1>{character.attributes?.name}</h1>
      <ReactMarkdown >{convertContentToString(character?.attributes?.characterDetail)}</ReactMarkdown>
      <Link href={`/characters/${character.id}`}>
      <p>More info</p>
    </Link>  
    </div>      
      </>
      ) 
      }  
      </>
    )
  }