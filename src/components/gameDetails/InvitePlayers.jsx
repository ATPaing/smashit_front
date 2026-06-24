import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";

const API_BASE = "http://localhost:3000";
const MIN_SEARCH_LENGTH = 2;
const DEBOUNCE_TIME = 500;

const InvitePlayers = ({
    gameId,
    invitedPlayerIds,
    minReliabilityScore = 0,
    onInviteSuccess,
    canInvite = true,
}) => {
    const { token } = useAuth();

    const [friends, setFriends] = useState([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [isInviting, setIsInviting] = useState(false);

    useEffect(() => {
        const loadFriends = async () => {
            setIsLoadingFriends(true);

            try {
                const response = await fetch(`${API_BASE}/friend`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Failed to load friends");
                }

                setFriends(data.friends || []);
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoadingFriends(false);
            }
        };

        loadFriends();
    }, [token]);

    const invitableFriends = useMemo(
        () =>
            friends.filter(
                (friend) =>
                    !invitedPlayerIds.includes(friend.id) &&
                    friend.reliabilityScore >= minReliabilityScore,
            ),
        [friends, invitedPlayerIds, minReliabilityScore],
    );

    useEffect(() => {
        if (
            searchValue.trim().length < MIN_SEARCH_LENGTH ||
            selectedUser?.name === searchValue
        ) {
            return;
        }

        setIsSearching(true);

        const timer = setTimeout(() => {
            const query = searchValue.trim().toLowerCase();
            const results = invitableFriends.filter(
                (friend) =>
                    friend.name.toLowerCase().includes(query) ||
                    friend.email.toLowerCase().includes(query),
            );

            setSearchResults(results);
            setError(
                results.length === 0 ? "No eligible friends found." : "",
            );
            setIsSearching(false);
        }, DEBOUNCE_TIME);

        return () => clearTimeout(timer);
    }, [searchValue, selectedUser, invitableFriends]);

    const handleInputChange = (event) => {
        const value = event.target.value;

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

    const handleInvite = async () => {
        setSearchResults([]);

        if (!canInvite) {
            setError("Players can only be invited to upcoming games.");
            return;
        }

        if (!selectedUser) {
            setError("Please select a friend to invite.");
            return;
        }

        if (selectedUser.reliabilityScore < minReliabilityScore) {
            setError(
                `This player does not meet the minimum reliability score of ${minReliabilityScore}`,
            );
            return;
        }

        setIsInviting(true);
        setError("");

        try {
            const response = await fetch(
                `${API_BASE}/game/${gameId}/invite`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: selectedUser.id }),
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to invite player");
            }

            toast.success(`${data.player.name} has been invited.`);
            onInviteSuccess(data.player);

            setSearchValue("");
            setSelectedUser(null);
            setSearchResults([]);
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setIsInviting(false);
        }
    };

    const allFriendsInvited =
        !isLoadingFriends &&
        friends.length > 0 &&
        friends.every((friend) => invitedPlayerIds.includes(friend.id));

    const noEligibleFriends =
        !isLoadingFriends &&
        friends.length > 0 &&
        !allFriendsInvited &&
        invitableFriends.length === 0;

    return (
        <section className="invite_players_card">
            <h2>Invite Players</h2>

            {minReliabilityScore > 0 && (
                <p className="invite_searching_text">
                    Minimum reliability required: {minReliabilityScore}%
                </p>
            )}

            {isLoadingFriends && (
                <p className="invite_searching_text">Loading friends...</p>
            )}

            {!isLoadingFriends && friends.length === 0 && (
                <p className="invite_searching_text">
                    You have no friends to invite.
                </p>
            )}

            {!isLoadingFriends && allFriendsInvited && (
                <p className="invite_searching_text">
                    All friends have already been invited.
                </p>
            )}

            {!isLoadingFriends && noEligibleFriends && (
                <p className="invite_searching_text">
                    No friends meet the minimum reliability score of{" "}
                    {minReliabilityScore}%.
                </p>
            )}

            {!isLoadingFriends && invitableFriends.length > 0 && (
                <div className="invite_search_wrapper">
                    <div className="invite_input_row">
                        <input
                            type="text"
                            placeholder="Search friends..."
                            value={searchValue}
                            onChange={handleInputChange}
                            disabled={!canInvite || isInviting}
                        />

                        <button
                            type="button"
                            onClick={handleInvite}
                            disabled={!canInvite || isInviting}
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

                    {error && (
                        <div className="invite_error_box">{error}</div>
                    )}
                </div>
            )}
        </section>
    );
};

export default InvitePlayers;
