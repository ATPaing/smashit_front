import { useContext } from "react";
import { GameContext } from "../context/gameContext.js";

export const useGamesContext = () => {
    return useContext(GameContext);
};