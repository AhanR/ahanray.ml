import { useState } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./achievements.module.css";

interface Data {
  key : string,
  title : string,
  topics : Array<string>,
  description : string
}

export default function Achievements() {

  const [searchKey, setSearchKey] = useState("All projects");

  const data : Array<Data> = [
    {
      key : "1",
      title : "This is the project title",
      topics : ["topic 1", "topic 2"],
      description : "This is the description for the fake project that I have built" 
    },
    {
      key : "2",
      title : "This is the project title",
      topics : ["topic 1", "topic 2"],
      description : "This is the description for the fake project that I have built" 
    },
  ]

  return (
    <PageWrapper
      className = {styles.wrapper}
    >
      <div className={styles.searchContainer}>
        <form 
          className={styles.header}
          onSubmit={e=>{
            e.preventDefault();
            // put search function
          }}
        >
          <input
            className={styles.input}
            type="text"
            value={searchKey}
            onChange={e=>setSearchKey(e.target.value)}
          />
          <button>S</button>
        </form>
        <div className={styles.searchResults}>
          {data.map(dat=>(<div 
            className={styles.result}
            key={dat.key}
          >
            <div className={styles.title} >{dat.title}</div>
            <div className={styles.topics}>
              {dat.topics.map(topic=>(
                <button>{topic}</button>
              ))}
            </div>
            <div className={styles.description}>
              {dat.description}
            </div>
          </div>))}
          <div className={styles.more}>5 more</div>
        </div>
      </div>
    </PageWrapper>
  )
}
