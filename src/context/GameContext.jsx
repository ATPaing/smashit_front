import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {GameContext} from "./gameContext";
import { API_BASE } from "../config/api.js";

const GameProvider = ({ children }) => {
    const { user } = useAuth();

    const [games, setGames] = useState([]);
    const [isLoadingGames, setIsLoadingGames] = useState(false);

    const refreshGames = useCallback(async () => {
        if (!user?.id) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_BASE}/game/all`, {
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
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;

        const loadGames = async () => {
            setIsLoadingGames(true);
            await refreshGames();
            setIsLoadingGames(false);
        };

        loadGames();
    }, [user?.id, refreshGames]);

    useEffect(() => {
        if (!user?.id) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        const eventSource = new EventSource(
            `${API_BASE}/sse/events?token=${token}`,
        );

        eventSource.addEventListener("notification", () => {
            refreshGames();
        });

        eventSource.addEventListener("next-game-changed", () => {
            refreshGames();
        });

        return () => {
            eventSource.close();
        };
    }, [user?.id, refreshGames]);

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