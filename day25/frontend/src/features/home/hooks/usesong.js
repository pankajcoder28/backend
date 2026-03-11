import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../services/song.api";

export const useSong = ()=>{
    const context = useContext(SongContext)

    const {song ,loading ,setLoading,setSong} = context

    async function handleGetSong({mood}){
        setLoading(true)
        const data = await getSong({mood})
        setSong(data.song)
        setLoading(false)
    }

    return ({loading , song , handleGetSong})
}


