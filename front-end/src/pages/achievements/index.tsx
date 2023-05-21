import { useState, useEffect } from "react";
import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./achievements.module.css"
import { getData, skillTypes } from "../../data/manager";
import { LocationNames } from "../../data/route-data";

export default function Skills() {

  const masterData = getData(LocationNames.achievements);

  const [skillType, setSkillType] = useState(skillTypes.certification)
  const [currentContext, setCurrentContext] = useState(masterData[skillType]);
  const [contextIndex, setContextIndex] = useState(0);

  useEffect(()=>{
    setCurrentContext(masterData[skillType]);
    setContextIndex(0);
  }, [skillType]);


  return (
    <PageWrapper
      className={styles.wrapper}
    >
      <div className={styles.topButtons}>
        <button
          className={skillType==skillTypes.certification? styles.selectedType : ""} 
          onClick={()=>{
            setSkillType(skillTypes.certification);
          }}
        >
          certifications
        </button>
        <button 
          className={skillType==skillTypes.experience? styles.selectedType : ""}
          onClick={()=>{
            setSkillType(skillTypes.experience);
          }}
        >
          experiences
        </button>
      </div>
      <div className={styles.explorer}>
        <div className={styles.header}>
          <a
            className={styles.title}
            href={currentContext[contextIndex].url}
            target="_blank"
          >
            {currentContext[contextIndex].title}
          </a>
          <div className={styles.controls}>
            <div className={styles.buttons}>
              <button
                onClick={()=>setContextIndex((contextIndex-1+currentContext.length)%currentContext.length)}
              >{"<"}</button>
              <button
                onClick={()=>setContextIndex((contextIndex+1)%currentContext.length)}
              >{">"}</button>
            </div>
            <span>{contextIndex+1} of {currentContext.length}</span>
          </div>
        </div>
        <div className={styles.data}>
          <iframe 
            src= {currentContext[contextIndex].url}
            // frameBorder="0"
            className={styles.iframe}
          >
          </iframe>
        </div>
      </div>
    </PageWrapper>
  )
}
