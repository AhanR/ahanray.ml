import PageWrapper from "../../components/pageWrapper/pageWrapper";
import { SkillData, getData } from "../../data/manager";
import { LocationNames } from "../../data/route-data";
import styles from "./skills.module.css"
import { useState, useEffect, useCallback } from 'react'; 
import debounce from "lodash.debounce";
import { motion } from "framer-motion";

export default function Projects() {

  const masterData : Array<SkillData> = getData(LocationNames.skills);
  const [data, setData] = useState(masterData.slice(0,4));
  const [searchKey, setSearchKey] = useState("code");

  const search = useCallback(debounce((searchKey:string)=>{
    // do search
    if(searchKey != "") {
      searchKey = searchKey.toLowerCase();
      let searchResult : Array<{dataPoint : SkillData, score: number}> = [];
      for(let dataPoint of masterData) {
        const searchBody = dataPoint.title.toLowerCase() + " " + dataPoint.tags.join(" ").toLowerCase();
        let score = Array.from(searchBody.matchAll(RegExp(searchKey,"g"))).length;
        searchResult.push({dataPoint : dataPoint, score : score});
        if(searchResult.length > 4) {
          searchResult = searchResult.sort((a,b)=>a.score < b.score ? 1 : -1);
          searchResult = searchResult.splice(0,4);
        }
      }
      let tops = [];
      for(let r of searchResult) tops.push(r.dataPoint);
      setData(tops);
    } 

  },500),[])

  useEffect(()=>{
    search(searchKey);
  }, [searchKey])

  return (
    <PageWrapper
      className={styles.wrapper}
    >
      <div
        className={styles.wrapperContent}
      >
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          className={styles.questionWrapper}
        >
          <div
            className={styles.question}
          >
            Can Ahan
          </div>
          <input
            className={styles.blank}
            value={searchKey}
            onChange={e=>setSearchKey(e.target.value)}
          />
        </motion.div>
        <motion.div
          className={styles.answerWrapper}
          initial={{ height: 0 }}
          animate={{ height: 'max-content' }}
        >
          <div
            className={styles.resultHeader}
          >As legend has it, Ahan can</div>
          {data.map(dat=>(<div className={styles.resultOption} >{dat.title}</div>))}
        </motion.div>
      </div>
    </PageWrapper>
  )
}
