import { ApolloClient, InMemoryCache,gql, useQuery } from '@apollo/client';
import createApolloClient from '../../../appolo-client';
import { Blogpost,BlogpostEntity ,Episode,EpisodeEntity} from '../../gql/graphql';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../../utils/contentUtils';
import styles from '../../styles/Blogposts.module.css';
import { GetStaticProps } from "next";

const apolloClient = createApolloClient();

interface PostsProps {
  blogposts:BlogpostEntity[] 
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
            publishedAt 
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
    }
    `,
  });   

  const blogposts:BlogpostEntity[]=data.blogposts.data;

  return {
      props: {
        
        blogposts:blogposts      
      },
  };
};




export default function Blogposts({blogposts} :{blogposts:BlogpostEntity[]}) { 
 /*const { loading, error, data} = useQuery(gql`
 query {
  blogposts {
    data {
      attributes {        
        Title
        Content  
        publishedAt 
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
}
  `);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }  

const blogposts:BlogpostEntity[] =data.blogposts.data;*/



const formatDate = (dateString:any) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const formattedDate = new Date(dateString).toLocaleDateString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+),?/, '$3-$1-$2 ');
    return formattedDate;
  };


    return (
      
    <> 

{blogposts.map((blogpost)=>
      <>      
      <div key={blogpost.id} className={styles.blogPostContainer}>
        <h1>{blogpost?.attributes?.Title}</h1>
      <ReactMarkdown className={styles.contentContainer}>{convertContentToString(blogpost?.attributes?.Content)}</ReactMarkdown>          
      </div>
      <div className={styles.authorContainer}>
        <h4>Gemaakt door</h4>
        <div className={styles.dateContainer}>
        <p>{ blogpost?.attributes?.author?.data?.attributes?.firstname + "  " +blogpost?.attributes?.author?.data?.attributes?.lastname}</p>
        <p>{formatDate(blogpost?.attributes?.publishedAt)}</p>
        </div>
        
    </div></>      
      )}

     
    
    </>
  )
}
