import React from 'react';
import { useDispatch } from "react-redux";
import { changeLocation } from '../../stores/locationSlices';
import { motion } from 'framer-motion';

interface Props {
    to : string,
    style? : any,
    className? : string,
    children : React.ReactNode
}

export default function ButtonLink(props : Props) {

  // drill props so that the location is avalable to the element
  const dispatcher = useDispatch();

  return (
    <motion.div
        className={props.className}
        style={props.style}
        onTap={()=>{
            dispatcher(changeLocation(props.to));
        }}
    >{props.children}</motion.div>
  )
}