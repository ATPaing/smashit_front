import CurrentGameCard from "../components/CurrentGameCard";

import "./CurrentGames.css";

const CurrentGames = () => {
const currentGames = [
    {
        id: 1,
        title: "Saturday Social",
        startDateTime: "2026-07-15T10:00:00",
        endDateTime: "2026-07-15T12:00:00",
        location: "MAIN ARENA • COURT 04",
        hostName: "Marcus Chen",
        invitees: [
            { id: 1, name: "Sarah Jenkins" },
            { id: 2, name: "David Chen" },
            { id: 3, name: "Mia Rodriguez" },
            { id: 4, name: "Alex Turner" },
            { id: 5, name: "Emma Collins" },
        ],
    },
    {
        id: 2,
        title: "Midweek Fun",
        startDateTime: "2026-07-19T18:30:00",
        endDateTime: "2026-07-19T20:30:00",
        location: "NORTH WING • COURT 02",
        hostName: "Sarah Jenkins",
        invitees: [
            { id: 1, name: "Marcus Chen" },
            { id: 2, name: "Olivia Wilson" },
            { id: 3, name: "Daniel Kim" },
        ],
    },
    {
        id: 3,
        title: "Friendly Rally",
        startDateTime: "2026-07-20T14:00:00",
        endDateTime: "2026-07-20T16:00:00",
        location: "CITY SPORTS • COURT 06",
        hostName: "David Miller",
        invitees: [
            { id: 1, name: "Ryan Lee" },
            { id: 2, name: "Sophia Patel" },
        ],
    },
    {
        id: 4,
        title: "Late Night Smash",
        startDateTime: "2026-07-21T20:00:00",
        endDateTime: "2026-07-21T22:00:00",
        location: "DOWNTOWN ARENA • COURT 01",
        hostName: "Alex Turner",
        invitees: [
            { id: 1, name: "Mia Rodriguez" },
        ],
    },
    {
        id: 5,
        title: "Weekend Ladder",
        startDateTime: "2026-07-22T09:30:00",
        endDateTime: "2026-07-22T12:30:00",
        location: "SOUTH HALL • COURT 08",
        hostName: "Emma Collins",
        invitees: [],
    },
    {
        id: 6,
        title: "Power Play Session",
        startDateTime: "2026-07-23T17:00:00",
        endDateTime: "2026-07-23T19:00:00",
        location: "RIVERSIDE • COURT 03",
        hostName: "Ryan Lee",
        invitees: [
            { id: 1, name: "Sarah Jenkins" },
            { id: 2, name: "Daniel Kim" },
            { id: 3, name: "Marcus Chen" },
            { id: 4, name: "Olivia Wilson" },
        ],
    },
    {
        id: 7,
        title: "Competitive Doubles",
        startDateTime: "2026-07-24T18:00:00",
        endDateTime: "2026-07-24T21:00:00",
        location: "ELITE SPORTS HUB • COURT 05",
        hostName: "Sophia Patel",
        invitees: [
            { id: 1, name: "Marcus Chen" },
            { id: 2, name: "Alex Turner" },
            { id: 3, name: "Emma Collins" },
            { id: 4, name: "Olivia Wilson" },
            { id: 5, name: "Ryan Lee" },
            { id: 6, name: "David Chen" },
        ],
    },
    {
        id: 8,
        title: "Morning Practice Club",
        startDateTime: "2026-07-25T07:00:00",
        endDateTime: "2026-07-25T09:00:00",
        location: "THE SHUTTLE HUB • COURT 07",
        hostName: "Daniel Kim",
        invitees: [
            { id: 1, name: "David Chen" },
            { id: 2, name: "Ryan Lee" },
            { id: 3, name: "Sophia Patel" },
            { id: 4, name: "Michael Brown" },
            { id: 5, name: "Sarah Jenkins" },
            { id: 6, name: "Emma Collins" },
        ],
    },
    {
        id: 9,
        title: "Beginner Meetup",
        startDateTime: "2026-07-26T13:00:00",
        endDateTime: "2026-07-26T15:00:00",
        location: "GREENFIELD CENTER • COURT 02",
        hostName: "Olivia Wilson",
        invitees: [
            { id: 1, name: "Alex Turner" },
            { id: 2, name: "Mia Rodriguez" },
        ],
    },
    {
        id: 10,
        title: "Elite Conditioning Session",
        startDateTime: "2026-07-27T19:30:00",
        endDateTime: "2026-07-27T22:00:00",
        location: "PREMIER BADMINTON CLUB • COURT 09",
        hostName: "Michael Brown",
        invitees: [
            { id: 1, name: "Marcus Chen" },
            { id: 2, name: "Sarah Jenkins" },
            { id: 3, name: "Daniel Kim" },
            { id: 4, name: "Emma Collins" },
            { id: 5, name: "Ryan Lee" },
            { id: 6, name: "Sophia Patel" },
            { id: 7, name: "David Miller" },
        ],
    },
];
    return (
        <div className="currentGames">
            <div className="currentGames_header">
                <h2>Current Games</h2>
                <p>
                    These games are currently in progress. Player rosters are
                    locked and participation is no longer available.
                </p>
            </div>

            <div className="currentGames_grid">
                {currentGames.map((game) => (
                    <CurrentGameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default CurrentGames;