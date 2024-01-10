import Link from "next/link";

import styles from '../styles/Synopsiscard.module.css';
import { EpisodeEntity} from '../gql/graphql';
import ReactMarkdown from "react-markdown";
import { convertContentToString } from '../utils/contentUtils';
interface SynopsiscardProps {
  episodes: EpisodeEntity[];
}

const Synopsiscard: React.FC<SynopsiscardProps> = ({ episodes }) => {

  
    return (
    <div className={styles.container}> 
      <h1 className={styles.sectionTitle}>Synopsis van elke aflevering</h1>
   

      
      {episodes.map((episode)=>
      <div key={episode.id} className={styles.episodeContainer}>
      <h2 className={styles.episodeTitle}>{episode.attributes?.Title}</h2>    
      <ReactMarkdown className={styles.episodeSynopsis}>
        {convertContentToString(episode.attributes?.synopsis)}
        </ReactMarkdown>       
      </div>      
      )}    
      
    </div>
);}

    


export default Synopsiscard;
