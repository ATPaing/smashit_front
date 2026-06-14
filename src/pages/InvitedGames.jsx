import InvitedGameCard from "../components/InvitedGameCard";

import { useAuth } from "../hooks/useAuth";
import { useGamesContext } from "../hooks/useGameContext";

import "./InvitedGames.css";

const InvitedGames = () => {
    const { user } = useAuth();
    const { games, isLoadingGames } = useGamesContext();

    const invitedGames = games
        .filter(
            (game) =>
                game.hostId !== user?.id &&
                new Date(game.startTime) > new Date(),
        )
        .map((game) => {
            const myInvitation = game.invitation?.find(
                (invite) => invite.userId === user?.id,
            );

            return {
                id: game.id,
                hostName: game.host?.name,
                title: game.name,
                startDateTime: game.startTime,
                endDateTime: game.endTime,
                location: game.location,
                feeType: game.feeType,
                rsvpStatus: myInvitation?.status || "PENDING",
            };
        });

    if (isLoadingGames) {
        return (
            <div className="invitedGames">
                <p>Loading invited games...</p>
            </div>
        );
    }

    return (
        <div className="invitedGames">
            <div className="invitedGames_header">
                <h2>Invited Games</h2>
                <p>
                    You have been selected to join these upcoming matches.
                    Review the details and respond to secure your spot on the
                    court.
                </p>
            </div>

            <div className="invitedGames_grid">
                {invitedGames.map((game) => (
                    <InvitedGameCard
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>
        </div>
    );
};

export default InvitedGames;