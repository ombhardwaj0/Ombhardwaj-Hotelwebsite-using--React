import { useLocation } from "react-router-dom"

export default function NotFound(){
    const {pathname}=useLocation()
    //console.log(data)
    return(
        <>
        <h1>Page Not Found at {pathname}</h1>
        </>
    )
}