import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../appolo-client';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../../utils/contentUtils';
import { CharacterEntity} from '../../gql/graphql';
import Link from 'next/link';
import { GetStaticProps } from "next";

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

/*

    const { loading, error, data} = useQuery(gql` 
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
  `);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const characters:CharacterEntity[] =data.characters.data;*/
  
    return (
      <>   
      {characters.map((character)=>
      <>
      <h1>{character.attributes?.name}</h1>
      <ReactMarkdown >{convertContentToString(character?.attributes?.characterDetail)}</ReactMarkdown>
      <Link href={`/characters/${character.id}`}>
      <p>More info</p>
    </Link>        
      </>
      ) 
      }  
      </>
    )
  }