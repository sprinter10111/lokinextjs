
import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../appolo-client';
import { Blogpost,BlogpostEntity ,Episode,EpisodeEntity} from '../gql/graphql';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../utils/contentUtils';
import Synopsiscard from '../components/synopsiscard';
import styles from '../styles/Index.module.css';

import { GetStaticProps } from "next";
const apolloClient = createApolloClient();


interface PostsProps {
  blogpostEntity: any;
  episodes:any[];

}

export const getStaticProps : GetStaticProps<PostsProps> = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        blogposts {
          data {
            attributes {
              Title
              Content
              createdAt
              author {
                data {
                  attributes {
                    firstname
                    lastname
                    email
                  }
                }
              }
            }
          }
        }
        episodes {
          data {
            attributes {
              Title
              synopsis
            }
          }
        }
      }
    `,
  });
  

const blogposts:BlogpostEntity[] =data.blogposts.data;
const blogpostEntity=blogposts[blogposts?.length-1];

const episodes:EpisodeEntity[]=data.episodes.data;
  
  return {
      props: {
        blogpostEntity: blogpostEntity,
        episodes:episodes      
      },
  };
};

export default function Home({blogpostEntity,episodes}:{blogpostEntity: BlogpostEntity, episodes:EpisodeEntity[]}) { 
 
const laatsteblogpost=blogpostEntity.attributes;

    return (
    <>   
    <div className={styles.container}>
      <h2>laatste blog post</h2>
      <div className={styles.blogPostContainer}>
      <div className={styles.titleContainer}>
        <h1>{laatsteblogpost?.Title}</h1>
      </div>
        <ReactMarkdown>{convertContentToString(laatsteblogpost?.Content)}</ReactMarkdown>
        </div>
      <div>
      <div className={styles.authorContainer}>
        <div>
      <h4>Gemaakt door</h4>
      <p className={styles.authorText}>
          {laatsteblogpost?.author?.data?.attributes?.firstname + "  " + laatsteblogpost?.author?.data?.attributes?.lastname}
        </p>
      </div>      
        
      </div>
    </div>
    <div className={styles.synopsiscardContainer}> 
      <Synopsiscard  episodes={episodes} />  
    </div>
      
    </div>
    </>
  )
}
