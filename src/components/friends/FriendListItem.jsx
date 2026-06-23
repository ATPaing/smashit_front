import { useEffect, useRef, useState } from "react";
import Avatar from "react-avatar";

import FriendReliabilityScore from "./FriendReliabilityScore";

import "./FriendListItem.css";

const AVATAR_COLORS = [
    "#10B981",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#F97316",
];

const FriendListItem = ({ friend, onRemove, isRemoving }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="friend_list_item">
            <div className="friend_list_item_left">
                <div className="friend_avatar_wrapper">
                    <Avatar
                        name={friend.name}
                        size="48"
                        round
                        fgColor="#ffffff"
                        colors={AVATAR_COLORS}
                    />
                    <span
                        className="friend_presence_dot"
                        aria-hidden="true"
                        title="Presence coming soon"
                    />
                </div>

                <p className="friend_list_item_name">{friend.name}</p>
            </div>

            <FriendReliabilityScore score={friend.reliabilityScore} />

            <div className="friend_list_item_menu" ref={menuRef}>
                <button
                    type="button"
                    className="friend_list_item_menu_btn"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Friend options"
                >
                    ⋮
                </button>

                {menuOpen && (
                    <div className="friend_list_item_dropdown">
                        <button
                            type="button"
                            onClick={() => {
                                setMenuOpen(false);
                                onRemove(friend);
                            }}
                            disabled={isRemoving}
                        >
                            {isRemoving ? "Removing..." : "Remove Friend"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendListItem;
