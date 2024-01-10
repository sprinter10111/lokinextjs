import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../appolo-client';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../../utils/contentUtils';
import { EpisodeEntity} from '../../gql/graphql';
import Link from 'next/link';
import styles from '../../styles/Episodes.module.css';
import { GetStaticProps } from "next";




const apolloClient = createApolloClient();



interface PostsProps {
    episodes:EpisodeEntity[]  
  }
  
  export const getStaticProps : GetStaticProps<PostsProps> = async () => {
    const { data } = await apolloClient.query({
      query: gql`
      query { 
        episodes{
            data{
                id
                attributes{
                    Title
                    synopsis
                    picture{
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

    const episodes:EpisodeEntity[]=data.episodes.data;
  
  
    return {
        props: {
          
          episodes:episodes      
        },
    };
  };







export default function Episodes({episodes} :{episodes:EpisodeEntity[]}) {
  
    return (
        <>   
        {episodes.map((episode)=>
        <div key={episode.id} className={styles.episodeContainer}>
        <h1 className={styles.episodeTitle}>{episode.attributes?.Title}</h1>
        <ReactMarkdown className={styles.episodeSynopsis}>{convertContentToString(episode.attributes?.synopsis)}</ReactMarkdown>
        <Link href={`/episodes/${episode.id}`}>
        <p className={styles.moreInfoLink}>More info</p>
      </Link>        
        </div>
        ) 
        }  
        </>
    )
  }