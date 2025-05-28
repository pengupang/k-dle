import React from "react";
import Attributes from "./Attributes";
import songImg from "./songImg"
import songs from "@/Data/Songs.json"

const songCard = ({ cancion, cancionDelDia }) => {
    const getColor = (atributo) => {
        const compareStrings = 
            cancion[atributo].filter === cancionDelDia[atributo].length
        if (compareStrings) {
            return "bg-#74C69D"
        }else if ()
    }
}