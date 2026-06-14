import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {GameContext} from "./gameContext";

const GameProvider = ({ children }) => {
    const { user } = useAuth();

    const [games, setGames] = useState([]);
    const [isLoadingGames, setIsLoadingGames] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetchGamesOnLoad = async () => {
            setIsLoadingGames(true);

            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:3000/game/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch games");
                }

                const data = await response.json();

                setGames(data.games);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingGames(false);
            }
        };

        fetchGamesOnLoad();
    }, [user?.id]);

    const refreshGames = async () => {
        if (!user?.id) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("http://localhost:3000/game/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch games");
            }

            const data = await response.json();

            setGames(data.games);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GameContext.Provider
            value={{
                games,
                setGames,
                isLoadingGames,
                refreshGames,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameProvider;