

import { useEffect } from "react";
import { gql, useQuery } from '@apollo/client';
import { Blogpost,BlogpostEntity } from '../gql/graphql';



export default function Home() { 
 const { loading, error, data} = useQuery(gql`
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
  }
  `);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }


const blogposts:BlogpostEntity[] =data.blogposts.data;
console.log("data  "+data)
console.log("daaaaa")
console.log(blogposts);

const laatsteblogpost=blogposts[blogposts?.length-1]?.attributes;
console.log("cccc"+laatsteblogpost);

const contentItems = laatsteblogpost?.Content?.map((item:any, index:any) => (
  <p key={index}>{item.text}</p>
));


    return (
    <>    
    <p> fgff</p>
    <p>iets</p>
      <p>laatste blog post</p>
      <div><h1>{laatsteblogpost?.Title}</h1>
      <div>{contentItems}</div>
      </div>
      <div>
        <h2>gemaakt door</h2>
        <p>{ laatsteblogpost?.author?.data?.attributes?.firstname + "  " +laatsteblogpost?.author?.data?.attributes?.lastname}</p>
        
    </div>

    <div> 
      <h2>Zie hier de synopsis van elke aflevering van seizoen 1.</h2>
    </div>
    </>
  )
}
