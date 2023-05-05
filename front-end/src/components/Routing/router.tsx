import { useEffect, useState } from "react";
import { pages } from "../../assets/route-data";

interface Props {
    location : String
}



export const findNext = (loc: string) => {
    for(let pi = 0; pi < pages.length; pi++) {
        const page = pages[pi];
        console.log(loc);
        if(page.path == loc) {
            return pages[(pi+1)%pages.length];
        }
    }
    return pages[0];
}

export default function Router( { location } : Props ) {

    useEffect(()=>{
        console.log("here",location);
        const page = pages.filter(page => page.path == location)[0];
        console.log(page);
        setCurrentPage(page.element);
    },[location]);

    const [currentPage, setCurrentPage] = useState<JSX.Element>(pages[0].element);

    return currentPage;
}