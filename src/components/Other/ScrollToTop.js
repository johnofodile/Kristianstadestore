import {useLocation} from "react-router-dom";
import {useEffect} from "react";



export const ScrollToTop=()=>{
    //the line below is called object destructuring.it extracts the pathanme object and assigns to the pathname variable
    const {pathname}=useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    },[pathname]);
    return null;

}




