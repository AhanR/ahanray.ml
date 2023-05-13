import { useEffect, useState } from "react";
import { pages } from "../../assets/route-data";
import { useSelector } from 'react-redux';

export const findNext = (loc: string) => {
    for(let pi = 0; pi < pages.length; pi++) {
        const page = pages[pi];
        if(page.path == loc) {
            return pages[(pi+1)%(pages.length)];
        }
    }
    return pages[0];
}

export const findPrev = (loc : string) => {
    for(let pi = 0; pi < pages.length; pi++) {
        const page = pages[pi];
        if(page.path == loc) {
            return pages[Math.max((pi - 1)%(pages.length),0)];
        }
    }
    return pages[0];
}

export default function Router() {

    const location = useSelector((state: any) => state.location);

    useEffect(()=>{
        const page = pages.filter(page => {
            return page.path == location;
        })[0];
        setCurrentPage(page.element);
    },[location]);

    const [currentPage, setCurrentPage] = useState<JSX.Element>(pages[0].element);

    return currentPage;
}