import { useState } from "react";
// import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { formatGameDate } from "../utils/formatGameDate";

import InfoCard from "../components/gameDetails/InfoCard";
import HostCard from "../components/gameDetails/HostCard";
import InvitePlayers from "../components/gameDetails/InvitePlayers";
import PlayerAttendance from "../components/gameDetails/PlayerAttendance";
import MatchSummary from "../components/gameDetails/MatchSummary";

import "./GameDetailsPage.css";

const avatarColors = ["#047857", "#2563EB", "#7C3AED", "#BE185D", "#C2410C"];

const sampleGame = {
    id: "SMASH-2026-084",
    status: "completed",
    title: "Advanced Doubles Drill",
    description:
        "Competitive doubles training session focused on rotation, defense, and fast drive exchanges.",
    location: {
        name: "Downtown Badminton Club",
        court: "Court 3",
    },
    startTime: "2026-10-24T18:30:00",
    endTime: "2026-10-24T20:00:00",
    feeType: "Shared Cost",
    minReliability: 70,
    host: {
        id: 1,
        name: "Aung",
        reliability: 96,
    },
    players: [
        {
            id: 1,
            name: "Aung",
            role: "Host",
            rsvpStatus: "accepted",
            attendanceStatus: "present",
        },
        {
            id: 2,
            name: "Sarah O.",
            role: "Invitee",
            rsvpStatus: "accepted",
            attendanceStatus: "present",
        },
        {
            id: 3,
            name: "Marcus T.",
            role: "Invitee",
            rsvpStatus: "accepted",
            attendanceStatus: "absent",
        },
        {
            id: 4,
            name: "Chloe W.",
            role: "Invitee",
            rsvpStatus: "pending",
            attendanceStatus: "",
        },
    ],
};

const currentUser = {
    id: 1,
};

const GameDetailsPage = () => {
    // const { gameId } = useParams();

    const [game, setGame] = useState(sampleGame);

    const isHost = game.host.id === currentUser.id;

    const { formattedDate, startTime, endTime } = formatGameDate(
        game.startTime,
        game.endTime,
    );

    const handleInviteSuccess = (newInvitee) => {
        setGame((prev) => {
            const alreadyExists = prev.players.some(
                (player) => player.id === newInvitee.id,
            );

            if (alreadyExists) {
                toast.error("Player already invited.");
                return prev;
            }

            return {
                ...prev,
                players: [...prev.players, newInvitee],
            };
        });
    };

    return (
        <main className="game_details_page">
            <div className="breadcrumb">
                <Link to="/dashboard/games">Games</Link>

                <span>/</span>

                <span>{game.title}</span>

                <div className='breadcrumb_status'>
                    <div className={`breadcrumb_status_indicator ${game.status}`}>

                    </div>
                    <p>{game.status}</p>
                </div>
            </div>

            <section className="game_title_area">
                <div>
                    <span className={`game_status ${game.status}`}>
                        {game.status}
                    </span>

                    <span className="game_ref">Ref: {game.id}</span>
                </div>

                <h1>{game.title}</h1>

                <p>{game.description}</p>
            </section>

            <section className="game_info_grid">
                <InfoCard
                    icon="📍"
                    label="Location"
                    title={game.location.name}
                    subtitle={game.location.court}
                />

                <InfoCard
                    icon="📅"
                    label="Date & Time"
                    title={formattedDate}
                    subtitle={`${startTime} - ${endTime}`}
                />

                <InfoCard icon="💳" label="Fee Type" title={game.feeType} />

                <InfoCard
                    icon="🛡️"
                    label="Min Reliability"
                    title={`${game.minReliability}`}
                    subtitle="Required Score"
                />

                <HostCard host={game.host} avatarColors={avatarColors} />
            </section>

            {isHost && <InvitePlayers onInviteSuccess={handleInviteSuccess} />}

            <section className="game_content_grid">
                <PlayerAttendance
                    players={game.players}
                    avatarColors={avatarColors}
                />

                <MatchSummary players={game.players} />
            </section>
        </main>
    );
};

export default GameDetailsPage;
