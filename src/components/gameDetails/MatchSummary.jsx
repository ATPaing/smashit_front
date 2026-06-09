import SummaryBox from "./SummaryBox";

const MatchSummary = ({ players }) => {
    const invited = players.length;

    const accepted = players.filter(
        (player) => player.rsvpStatus === "accepted",
    ).length;

    const declined = players.filter(
        (player) => player.rsvpStatus === "declined",
    ).length;

    const pending = players.filter(
        (player) => player.rsvpStatus === "pending",
    ).length;

    const rate = invited === 0 ? 0 : Math.round((accepted / invited) * 100);

    return (
        <aside className="summary_card">
            <h2>Match Summary</h2>

            <div className="rate_circle">
                <strong>{rate}%</strong>

                <span>Acceptance</span>
            </div>

            <div className="summary_grid">
                <SummaryBox label="Invited" value={invited} />

                <SummaryBox label="Accepted" value={accepted} />

                <SummaryBox label="Declined" value={declined} />

                <SummaryBox label="Pending" value={pending} />
            </div>

            <div className="quick_actions">
                <h4>Quick Actions</h4>

                <button type="button">Copy Invite Link</button>

                <button type="button">Share Results</button>
            </div>
        </aside>
    );
};

export default MatchSummary;
