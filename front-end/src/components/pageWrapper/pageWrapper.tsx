import { useContext, useState } from 'react';
import styles from './pageWrapper.module.css';
import { pagePadding } from '../status/status';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { LocationState, changeLocation } from '../../stores/locationSlices';
import { findPrev, findNext } from '../Routing/router';

export default function PageWrapper(props : any) {

  const padding = useContext(pagePadding)

  const [panAmount, setPanAmount] = useState(0);
  const [panStartCords, setPanStartCords] = useState({ x:0, y:0 })

  const dispatcher = useDispatch();
  const location  = useSelector((state: LocationState)=> state.location);

  const panClip = 200;

  return (
    <motion.div
      className={styles.pageComponent}
      style={{
        padding: `${padding.y} ${padding.x}`
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileTap={{ opacity: 1-Math.sin(panAmount/panClip*Math.PI/2) }}
      exit={{ opacity:0 }}
      onPanStart={(e,i)=>{
        e.stopPropagation();
        setPanStartCords({x:i.point.x, y: i.point.y});
        console.log("pan started");
      }}
      onPan={(e,i)=>{
        e.stopPropagation();
        const dist = Math.sqrt(Math.pow((panStartCords.x - i.point.x),2) + Math.pow((panStartCords.y - i.point.y),2));
        setPanAmount(Math.min(dist,panClip));
      }}
      onPanEnd={(e,i)=>{
        e.stopPropagation();
        const dist = Math.sqrt(Math.pow((panStartCords.x - i.point.x),2) + Math.pow((panStartCords.y - i.point.y),2));
        setPanAmount(Math.min(dist,panClip));
        // if the panning is over, then check if over 50% of the clip amount is travelled then change page, else return it back to init
        // if the point is lower than the initial point, go previous page, else next page
        if(panAmount/panClip > 0.9) {
          // next page
          // scrolled down
          if(panStartCords.y < i.point.y){
            console.log("scroll down, prev");
            dispatcher(changeLocation(findPrev(location).path))
            console.log(location);
          } else {
            console.log("Scroll up, next");
            dispatcher(changeLocation(findNext(location).path))
          }
        }
        setPanAmount(0);
      }}
    >
      <div className={props.className} style={props.style} >
        {
          props.children
        }
      </div>
    </motion.div>
  )
}
