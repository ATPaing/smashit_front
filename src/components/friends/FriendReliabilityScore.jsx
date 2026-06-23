import "./FriendReliabilityScore.css";

const getBarColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#3b82f6";
    return "#ef4444";
};

const FriendReliabilityScore = ({ score }) => {
    return (
        <div className="friend_reliability_score">
            <p className="friend_reliability_label">RELIABILITY SCORE</p>
            <div className="friend_reliability_row">
                <span className="friend_reliability_value">{score}%</span>
                <div className="friend_reliability_bar">
                    <div
                        style={{
                            width: `${score}%`,
                            backgroundColor: getBarColor(score),
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FriendReliabilityScore;
