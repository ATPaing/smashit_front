import InvitedGameCard from "../components/InvitedGameCard";
import "./InvitedGames.css";

const InvitedGames = () => {
const invitedGames = [
    {
        id: 1,
        hostName: "Sarah Jenkins",
        title: "Summer Open Practice",
        startDateTime: "2026-07-15T10:00:00",
        endDateTime: "2026-07-15T12:00:00",
        location: "Riverside Badminton Club",
        feeType: "Split",
    },
    {
        id: 2,
        hostName: "David Chen",
        title: "Elite Ladder Match",
        startDateTime: "2026-07-16T16:30:00",
        endDateTime: "2026-07-16T18:30:00",
        location: "City Sports Arena • Court 4",
        feeType: "Free",
    },
    {
        id: 3,
        hostName: "Mia Rodriguez",
        title: "Friendly Social Mixer",
        startDateTime: "2026-07-17T19:00:00",
        endDateTime: "2026-07-17T21:00:00",
        location: "The Shuttle Hub",
        feeType: "Free",
    },
    {
        id: 4,
        hostName: "Alex Turner",
        title: "Weekend Smash Arena",
        startDateTime: "2026-07-18T18:00:00",
        endDateTime: "2026-07-18T20:00:00",
        location: "Northside Sports Hall",
        feeType: "Split",
    },
    {
        id: 5,
        hostName: "Emma Collins",
        title: "Beginner Friendly Match",
        startDateTime: "2026-07-19T17:30:00",
        endDateTime: "2026-07-19T19:00:00",
        location: "Manchester Badminton Arena",
        feeType: "Free",
    },
    {
        id: 6,
        hostName: "Ryan Lee",
        title: "Evening Competitive Session",
        startDateTime: "2026-07-20T20:00:00",
        endDateTime: "2026-07-20T22:00:00",
        location: "Downtown Court Center",
        feeType: "Split",
    },
    {
        id: 7,
        hostName: "Sophia Patel",
        title: "Mixed Doubles Challenge",
        startDateTime: "2026-07-21T19:30:00",
        endDateTime: "2026-07-21T21:30:00",
        location: "Westside Shuttle Club",
        feeType: "Split",
    },
    {
        id: 8,
        hostName: "Michael Brown",
        title: "Friday Night Rally",
        startDateTime: "2026-07-22T21:00:00",
        endDateTime: "2026-07-22T23:00:00",
        location: "The Racquet Zone",
        feeType: "Free",
    },
    {
        id: 9,
        hostName: "Olivia Wilson",
        title: "Intermediate Training Camp",
        startDateTime: "2026-07-23T13:00:00",
        endDateTime: "2026-07-23T16:00:00",
        location: "Elite Sports Hub",
        feeType: "Split",
    },
    {
        id: 10,
        hostName: "Daniel Kim",
        title: "Morning Fitness Rally",
        startDateTime: "2026-07-24T09:30:00",
        endDateTime: "2026-07-24T11:00:00",
        location: "Greenfield Leisure Center",
        feeType: "Free",
    },
];

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
                    <InvitedGameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default InvitedGames;