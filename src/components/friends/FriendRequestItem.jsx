import Avatar from "react-avatar";

import "./FriendRequestItem.css";

const AVATAR_COLORS = [
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
];

const FriendRequestItem = ({
    request,
    onAccept,
    onDecline,
    isAccepting,
    isDeclining,
}) => {
    const { requester } = request;

    return (
        <div className="friend_request_item">
            <Avatar
                name={requester.name}
                size="48"
                round
                fgColor="#ffffff"
                colors={AVATAR_COLORS}
            />

            <div className="friend_request_item_info">
                <p className="friend_request_item_name">{requester.name}</p>
                <p className="friend_request_item_email">{requester.email}</p>
            </div>

            <div className="friend_request_item_actions">
                <button
                    type="button"
                    className="friend_request_accept_btn"
                    onClick={() => onAccept(request.id)}
                    disabled={isAccepting || isDeclining}
                >
                    {isAccepting ? "Accepting..." : "Accept"}
                </button>

                <button
                    type="button"
                    className="friend_request_reject_btn"
                    onClick={() => onDecline(request.id)}
                    disabled={isAccepting || isDeclining}
                >
                    {isDeclining ? "Rejecting..." : "Reject"}
                </button>
            </div>
        </div>
    );
};

export default FriendRequestItem;
