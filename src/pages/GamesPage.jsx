import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import CreateGameModal from "../components/CreateGameModal";

import "./GamesPage.css";

const GamesPage = () => {
    const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);

    return (
        <div className="gamesPage">
            <div className="gamesPage_header_wrapper">
                <div className="gamesPage_header">

                    <p>
                        Organize your matches, respond to invites, and track
                        your performance.
                    </p>
                </div>

                <button
                    className="gamesPage_createGame"
                    onClick={() => setIsCreateGameModalOpen(true)}
                >
                    Create Game
                </button>
            </div>

            <nav className="gamesPage_nav">
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard/games"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "games_nav_link active_games_nav_link"
                                    : "games_nav_link"
                            }
                        >
                            Upcoming Games
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/games/invited-games"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "games_nav_link active_games_nav_link"
                                    : "games_nav_link"
                            }
                        >
                            Invited Games
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/games/current-games"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "games_nav_link active_games_nav_link"
                                    : "games_nav_link"
                            }
                        >
                            Current Games
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/dashboard/games/past-games"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "games_nav_link active_games_nav_link"
                                    : "games_nav_link"
                            }
                        >
                            Past Games
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="gamesPage_content">
                <Outlet />
            </div>

            {isCreateGameModalOpen && (
                <CreateGameModal
                    onClose={() => setIsCreateGameModalOpen(false)}
                />
            )}
        </div>
    );
};

export default GamesPage;