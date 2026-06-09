import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const mockUsers = [
    { id: 5, name: "John Smith" },
    { id: 6, name: "Sarah Jenkins" },
    { id: 7, name: "Alex Wong" },
    { id: 8, name: "Mia Rodriguez" },
    { id: 9, name: "Aung Thet Paing" },
];

const MIN_SEARCH_LENGTH = 2;
const DEBOUNCE_TIME = 500;

const InvitePlayers = ({ onInviteSuccess }) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        if (
            searchValue.trim().length < MIN_SEARCH_LENGTH ||
            selectedUser?.name === searchValue
        ) {
            return;
        }

        const timer = setTimeout(() => {
            setIsSearching(true);

            const results = mockUsers.filter((user) =>
                user.name.toLowerCase().includes(searchValue.toLowerCase()),
            );

            setSearchResults(results);
            setError(results.length === 0 ? "User not found." : "");
            setIsSearching(false);
        }, DEBOUNCE_TIME);

        return () => {
            clearTimeout(timer);
        };
    }, [searchValue, selectedUser]);

    const handleInputChange = (e) => {
        const value = e.target.value;

        setSearchValue(value);
        setSelectedUser(null);

        if (value.trim().length < MIN_SEARCH_LENGTH) {
            setSearchResults([]);
            setError("");
            setIsSearching(false);
        }
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
        setSearchValue(user.name);
        setSearchResults([]);
        setError("");
        setIsSearching(false);
    };

    const handleInvite = () => {

        setSearchResults([]);

        if (!selectedUser) {
            setError("Please select a user to invite.");
            return;
        }

        setIsInviting(true);

        setTimeout(() => {
            toast.success(`${selectedUser.name} has been invited.`);

            onInviteSuccess({
                id: selectedUser.id,
                name: selectedUser.name,
                role: "Invitee",
                rsvpStatus: "pending",
                attendanceStatus: "",
                isNew: true,
            });

            setSearchValue("");
            setSelectedUser(null);
            setSearchResults([]);
            setError("");
            setIsInviting(false);
        }, 700);
    };

    return (
        <section className="invite_players_card">
            <h2>Invite Players</h2>

            <div className="invite_search_wrapper">
                <div className="invite_input_row">
                    <input
                        type="text"
                        placeholder="Search player name..."
                        value={searchValue}
                        onChange={handleInputChange}
                    />

                    <button
                        type="button"
                        onClick={handleInvite}
                        disabled={isInviting}
                    >
                        {isInviting ? "Inviting..." : "Invite"}
                    </button>
                </div>

                {isSearching && (
                    <p className="invite_searching_text">Searching...</p>
                )}

                {searchResults.length > 0 && (
                    <div className="invite_dropdown">
                        {searchResults.map((user) => (
                            <button
                                key={user.id}
                                type="button"
                                onClick={() => handleSelectUser(user)}
                            >
                                {user.name}
                            </button>
                        ))}
                    </div>
                )}

                {error && <div className="invite_error_box">{error}</div>}
            </div>
        </section>
    );
};

export default InvitePlayers;
