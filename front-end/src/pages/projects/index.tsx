import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./projects.module.css";
import debounce from "lodash.debounce";
import { ProjectData, getData } from "../../data/manager";
import { LocationNames } from "../../data/route-data";
import searchIcon from "../../icons/searchIcon.svg";
import { motion } from "framer-motion";

export default function Achievements() {

  const [searchKey, setSearchKey] = useState<Array<string>>([]);

  const masterData : Array<ProjectData> = getData(LocationNames.projects);

  const [data, setData] = useState(masterData.slice(0,2));
  const [moreResults, setMoreResults] = useState(masterData.length);

  const search = useCallback(debounce(()=>{
    // do some searching

    if(searchKey.length == 0) {
      setData(masterData.slice(0,2));
      setMoreResults(masterData.length);
    }
    else {
      let tops : Array<number> = [];
      let searchResults : Array<ProjectData> = [];
      let numRes : number = 0;
      for(let dataPoint of masterData) {
        let score = 0;
        let multiplier = dataPoint.priority;
        const searchString = (dataPoint.title+dataPoint.description+dataPoint.topics.join(" "));
        for(let k = 0; k < searchKey.length; k++) {
          score += Array.from(searchString.matchAll(RegExp(searchKey[k], "g"))).length*(k+1);
        }

        score *= (1+multiplier);
  
        if(score > 0) numRes++;
  
        if (tops.length < 1 || (tops.length == 1 && tops[0] >= score)) {
          tops.push(score);
          searchResults.push(dataPoint);
        }
        else if (tops.length == 1) {
          tops = [score].concat(tops);
          searchResults = [dataPoint].concat(searchResults);
        }
        else if(score > tops[0]) {
          tops[1] = tops[0];
          searchResults[1] = searchResults[0];
          tops[0] = score;
          searchResults[0] = dataPoint;
        }
        else if(score > tops[1]) {
          tops[1] = score;
          searchResults[1] = dataPoint;
        }
      }
      setData(searchResults);
      setMoreResults(numRes);
    }
  },500),[searchKey])

  useEffect(()=>{
    // perform throttled search
    search();
  }, [searchKey])

  return (
    <PageWrapper
      className = {styles.wrapper}
    >
      <motion.div 
        className={styles.searchContainer}
        initial={{ height: 0 }}
        animate={{ height: "max-content" }}
      >
        <form 
          className={styles.header}
          onSubmit={e=>{
            e.preventDefault();
          }}
        >
          <input
            className={styles.input}
            type="text"
            value={searchKey.length==0 ?"All projects" : searchKey}
            onChange={e=>{
              setSearchKey(e.target.value.split(","))
            }}
            id = "searchBox"
            autoComplete="off"
          />
          <label htmlFor="searchBox">
            <img src={searchIcon} alt="Search" />
          </label>
        </form>
        <div className={styles.searchResults}>
          {data.map(dat=>(<div 
            className={styles.result}
            key={dat.key}
          >
            <div className={styles.title} >{dat.title}</div>
            <div className={styles.topics}>
              {dat.topics.map(topic=>(
                <button
                  onClick={()=>{
                    if(!searchKey.includes(topic))
                      setSearchKey([...searchKey, topic])
                  }}
                >{topic}</button>
              ))}
            </div>
            <div className={styles.description}>
              {dat.description}
            </div>
          </div>))}
          {moreResults>2&&<div className={styles.more}>{moreResults-2} more</div>}
        </div>
      </motion.div>
    </PageWrapper>
  )
}
