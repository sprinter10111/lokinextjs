import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../../appolo-client';
import ReactMarkdown from 'react-markdown';
import { convertContentToString } from '../../../utils/contentUtils';
import styles from '../../../styles/Episode.module.css';
import { GetStaticPaths, GetStaticProps } from "next"; 
import { EpisodeEntity} from '../../../gql/graphql';
import { ParsedUrlQuery } from 'querystring';

const apolloClient = createApolloClient();


interface Paths extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths : GetStaticPaths<Paths> = async () => {    
    const { data } = await apolloClient.query({
      query: gql`
      query {  
        episodes{
            data{
                id  
            }
        }       
      }
      `,
    }); 
    const episodes=data.episodes.data; 
    const paths = episodes.map((episode:any) => ({
        params: { id: episode.id.toString() },
    })); 

    return {
        paths: paths,
        fallback: false,
    };
};

interface PostsProps {
  episode:EpisodeEntity  
}
export const getStaticProps : GetStaticProps<PostsProps, Paths> = async (context) => {
  const episodeId = context.params?.id;
  
  const { data } = await apolloClient.query({
    query: gql`
      query GetEpisode($episodeId: ID!) {
        episode(id: $episodeId) {
          data {
            id
            attributes {
              Title
              synopsis
              picture {
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
      episodeId,
    },
  });

  const episode:EpisodeEntity=data.episode.data;


  return {
      props: {
        
        episode:episode     
      },
  };
};





const EpisodeDetails = ({episode} :{episode:EpisodeEntity}) => {

episode.attributes?.picture?.data?.attributes?.url
  return (
    <>
      <div className={styles.episodeContainer}>
        <h1 className={styles.episodeTitle}>{episode?.attributes?.Title}</h1>
        <ReactMarkdown>{convertContentToString(episode?.attributes?.synopsis)}</ReactMarkdown>
        {episode?.attributes?.picture && (
          <img
          className={styles.episodeImage}
            src={`${episode.attributes?.picture?.data?.attributes?.url}`}
            alt="Episode Picture"
          />
        )}
      </div>
    </>
  );
};

export default EpisodeDetails;
