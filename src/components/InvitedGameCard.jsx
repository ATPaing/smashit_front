import Avatar from "react-avatar";

import calendarIcon from "../assets/calendar_icon.svg";
import feesIcon from "../assets/fees_icon.svg";
import locationIcon from "../assets/location_icon.svg";

import { formatGameDate } from "../utils/formatGameDate";

import "./InvitedGameCard.css";

const InvitedGameCard = ({ game }) => {
    const { formattedDate, startTime, endTime } = formatGameDate(
        game.startDateTime,
        game.endDateTime
    );

    return (
        <div className="invitedGameCard">
            <div className="invitedGameCard_content">
                <div className="invitedGameCard_host">
                    <Avatar
                        name={game.hostName}
                        size="45"
                        round={true}
                        fgColor="#ffffff"
                        colors={[
                            "#10B981",
                            "#3B82F6",
                            "#8B5CF6",
                            "#EC4899",
                            "#F97316",
                        ]}
                    />

                    <div>
                        <p className="hostLabel">HOSTED BY</p>
                        <p className="hostName">{game.hostName}</p>
                    </div>
                </div>

                <h3>{game.title}</h3>

                <div className="invitedGameCard_detail">
                    <img src={calendarIcon} alt="" />

                    <p>
                        {formattedDate} • {startTime} - {endTime}
                    </p>
                </div>

                <div className="invitedGameCard_detail">
                    <img src={locationIcon} alt="" />

                    <p>{game.location}</p>
                </div>

                <div className="invitedGameCard_detail">
                    <img src={feesIcon} alt="" />

                    <p>{game.feeType}</p>
                </div>
            </div>

            <div className="invitedGameCard_actions">
                <button className="declineBtn">Decline</button>

                <button className="acceptBtn">✓ Accept</button>
            </div>
        </div>
    );
};

export default InvitedGameCard;