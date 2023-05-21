import { useCallback, useContext, useState } from 'react';
import styles from './pageWrapper.module.css';
import { pagePadding } from '../status/status';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { LocationState, changeLocation } from '../../stores/locationSlices';
import { findPrev, findNext } from '../Routing/router';
import { LocationNames } from '../../data/route-data';

export default function PageWrapper(props : any) {

  const padding = useContext(pagePadding)

  const [panAmount, setPanAmount] = useState(0);
  const [panMenu, setPanMenu] = useState(0);
  const [panStartCords, setPanStartCords] = useState({ x:0, y:0 })

  const dispatcher = useDispatch();
  const location  = useSelector((state: LocationState)=> state.location);

  const panClip = 50;

  const changePage = (y : number)=>{
    // if the panning is over, then check if over 50% of the clip amount is travelled then change page, else return it back to init
        // if the point is lower than the initial point, go previous page, else next page
        console.log(panMenu)
        if (panMenu/panClip > 0.9) {
          // get to menu
          console.log("go to menu");
        } else if(Math.abs(panAmount/panClip) > 0.9) {
          if(panStartCords.y < y){
            dispatcher(changeLocation(findPrev(location).path))
          } else {
            dispatcher(changeLocation(findNext(location).path))
          }
        }
        setPanAmount(0);
  }

  let onWheelTimeOut : NodeJS.Timeout;
  const changePageOnWheel = useCallback((scrollAmount : number)=>{
    clearTimeout(onWheelTimeOut);
    onWheelTimeOut = setTimeout(()=>{
      if(scrollAmount/panClip > 0.1) {
        dispatcher(changeLocation(findNext(location).path))
      } else if (scrollAmount/panClip < -0.1) {
        dispatcher(changeLocation(findPrev(location).path))
      }
      setPanAmount(0);
    },30);
  },[])

  window.onkeydown = (e) => {
    if(e.key == "ArrowUp") {
      dispatcher(changeLocation(findPrev(location).path))
    } else if (e.key == "ArrowDown") {
      dispatcher(changeLocation(findNext(location).path))
    } else if (e.key == "ArrowRight") {
      dispatcher(changeLocation(LocationNames.menu))
    }
  }

  return (
    <motion.div
      className={styles.pageComponent + " " + props.className}
      style={{
        padding: `${padding.y} ${padding.x}`,
        ...props.style
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1-Math.sin(Math.abs(panAmount)/panClip*Math.PI/2) }}
      exit={{ opacity:0 }}
      onPanStart={(e,i)=>{
        e.stopPropagation();
        setPanStartCords({x:i.point.x, y: i.point.y});
      }}
      onPan={(e,i)=>{
        e.stopPropagation();
        // if the delta x is greater, set x, else y
        if(Math.abs(i.delta.x) <= Math.abs(i.delta.y)) {
          setPanAmount(Math.min(-panClip,Math.max(panClip, panAmount+i.delta.y)));
        } else {
          setPanMenu(Math.max(-panClip,Math.min(panClip, panAmount+i.delta.x)));
        }
      }}
      onPanEnd={(e,i)=>{
        e.stopPropagation();
        setPanAmount(Math.min(-panClip,Math.max(panClip, panAmount+i.delta.y)))
        // change the page
        changePage(i.point.y);
      }}
      onViewportEnter={props.onViewportEnter}
      drag="y"
      dragConstraints={{top:0, bottom: 0}}
      dragTransition={{ bounceStiffness: 800, bounceDamping: 20 }}

      // add the same page transition functions here too
      onWheel={(e)=>{
        // console.log(e);
        setPanAmount(Math.max(-panClip ,Math.min(panClip ,panAmount+e.deltaY)));
        changePageOnWheel(panAmount);
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
