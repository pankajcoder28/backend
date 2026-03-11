import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/jtur09rkv/cohort-2/moodify/songs/Millionaire__RiskyjaTT.CoM_mp3_rfGTfs5il",
        "profile": "https://ik.imagekit.io/jtur09rkv/cohort-2/moodify/posters/Millionaire__RiskyjaTT.CoM__ay-bvWzYS.jpg",
        "title": "Millionaire (RiskyjaTT.CoM)",
        "mood": "happy",
        "__v": 0
    })
    const [loading, setLoading] = useState(false)

    return(
        <SongContext.Provider value={{song ,loading ,setLoading,setSong}}>
            {children}
        </SongContext.Provider>
    )
}