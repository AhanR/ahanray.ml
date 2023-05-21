import PageWrapper from "../../components/pageWrapper/pageWrapper";
import styles from "./more.module.css";
import git from "../../icons/githubIcon.svg"
import linkedin from "../../icons/linkedinIcon.svg"
import email from "../../icons/emailIcon.svg"
import { SiRedux, SiReact, SiReactrouter, SiFirebase, RxFramerLogo } from 'react-icons/all';
import { links } from "../../data/manager";

export default function More() {
  return (
    <PageWrapper>
      <div className={styles.links}>
        <img
          src={git} 
          alt="github"
          onClick={()=>{window.open(links.github,"_blank")}}
        />
        <img 
          src={linkedin} 
          alt="linkedin" 
          onClick={()=>{window.open(links.linkedin,"_blank")}}
        />
        <img 
          src={email} 
          alt="email" 
          onClick={()=>{window.open(links.mail,"_blank")}}
        />
      </div>
      <div
        className={styles.about}
      >
        Hi, I create websites. I'm a buisness analyst too and would love to meet you. Try reaching out to me, let's talk. 🌸
      </div>
      <div className={styles.stats}>
        Tech Stack
        <div className={styles.tech}>
          <SiFirebase/>
          <SiReact/>
          <SiRedux/>
          <RxFramerLogo/>
          <SiReactrouter/>
        </div>
      </div>
    </PageWrapper>
  )
}
