import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import ConfirmationModal from "../components/ConfirmationModal";
import FriendListItem from "../components/friends/FriendListItem";
import FriendRequestItem from "../components/friends/FriendRequestItem";
import FriendsSearchBar from "../components/friends/FriendsSearchBar";

import { useAuth } from "../hooks/useAuth";
import { API_BASE } from "../config/api.js";

import "./FriendsPage.css";

const MIN_SEARCH_LENGTH = 2;
const DEBOUNCE_TIME = 500;

const FriendsPage = () => {
    const { token } = useAuth();

    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSearchUser, setSelectedSearchUser] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const [actionLoading, setActionLoading] = useState({
        acceptId: null,
        declineId: null,
        removeId: null,
        inviteUserId: null,
    });

    const [friendToRemove, setFriendToRemove] = useState(null);

    const authHeaders = {
        Authorization: `Bearer ${token}`,
    };

    const loadFriends = useCallback(async () => {
        const response = await fetch(`${API_BASE}/friend`, {
            headers: authHeaders,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load friends");
        }

        setFriends(data.friends || []);
    }, [token]);

    const loadRequests = useCallback(async () => {
        const response = await fetch(`${API_BASE}/friend/requests`, {
            headers: authHeaders,
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to load friend requests");
        }

        setRequests(data.requests || []);
    }, [token]);

    const refreshPageData = useCallback(async () => {
        await Promise.all([loadFriends(), loadRequests()]);
    }, [loadFriends, loadRequests]);

    useEffect(() => {
        const loadPage = async () => {
            setIsLoading(true);

            try {
                await refreshPageData();
            } catch (err) {
                toast.error(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPage();
    }, [refreshPageData]);

    useEffect(() => {
        if (searchQuery.trim().length < MIN_SEARCH_LENGTH) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);

            try {
                const response = await fetch(
                    `${API_BASE}/friend/search?q=${encodeURIComponent(searchQuery.trim())}`,
                    { headers: authHeaders },
                );
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Search failed");
                }

                setSearchResults(data.users || []);
            } catch (err) {
                toast.error(err.message);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, DEBOUNCE_TIME);

        return () => clearTimeout(timer);
    }, [searchQuery, token]);

    const refreshSearch = async () => {
        if (searchQuery.trim().length < MIN_SEARCH_LENGTH) return;

        try {
            const response = await fetch(
                `${API_BASE}/friend/search?q=${encodeURIComponent(searchQuery.trim())}`,
                { headers: authHeaders },
            );
            const data = await response.json();

            if (response.ok) {
                setSearchResults(data.users || []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleAcceptRequest = async (requestId) => {
        setActionLoading((prev) => ({ ...prev, acceptId: requestId }));

        try {
            const response = await fetch(
                `${API_BASE}/friend/request/${requestId}/accept`,
                {
                    method: "PUT",
                    headers: authHeaders,
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to accept request");
            }

            toast.success("Friend request accepted");
            setRequests((prev) => prev.filter((item) => item.id !== requestId));
            await loadFriends();
            await refreshSearch();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setActionLoading((prev) => ({ ...prev, acceptId: null }));
        }
    };

    const handleDeclineRequest = async (requestId) => {
        setActionLoading((prev) => ({ ...prev, declineId: requestId }));

        try {
            const response = await fetch(
                `${API_BASE}/friend/request/${requestId}/decline`,
                {
                    method: "PUT",
                    headers: authHeaders,
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to decline request");
            }

            toast.success("Friend request declined");
            setRequests((prev) => prev.filter((item) => item.id !== requestId));
            await refreshSearch();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setActionLoading((prev) => ({ ...prev, declineId: null }));
        }
    };

    const handleInviteMember = async () => {
        if (!selectedSearchUser) {
            toast.error("Search and select a member first");
            return;
        }

        if (selectedSearchUser.relationshipStatus !== "NONE") {
            toast.error("This user cannot be invited right now");
            return;
        }

        setActionLoading((prev) => ({
            ...prev,
            inviteUserId: selectedSearchUser.id,
        }));

        try {
            const response = await fetch(`${API_BASE}/friend/request`, {
                method: "POST",
                headers: {
                    ...authHeaders,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: selectedSearchUser.id }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to send friend request");
            }

            toast.success("Friend request sent");
            setSelectedSearchUser(null);
            await refreshSearch();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setActionLoading((prev) => ({ ...prev, inviteUserId: null }));
        }
    };

    const handleRemoveFriend = async () => {
        if (!friendToRemove) return;

        setActionLoading((prev) => ({ ...prev, removeId: friendToRemove.id }));

        try {
            const response = await fetch(
                `${API_BASE}/friend/${friendToRemove.id}`,
                {
                    method: "DELETE",
                    headers: authHeaders,
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to remove friend");
            }

            toast.success("Friend removed successfully");
            setFriends((prev) =>
                prev.filter((friend) => friend.id !== friendToRemove.id),
            );
            setFriendToRemove(null);
            await refreshSearch();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setActionLoading((prev) => ({ ...prev, removeId: null }));
        }
    };

    if (isLoading) {
        return (
            <div className="friends_page">
                <p className="friends_page_loading">Loading friends...</p>
            </div>
        );
    }

    return (
        <div className="friends_page">
            <div className="friends_page_header">
                <div className="friends_page_header_text">
                    <h1>Friends Network</h1>
                    <p>Manage your connections and find new partners</p>
                </div>

                <div className="friends_page_header_actions">
                    <FriendsSearchBar
                        searchQuery={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                        searchResults={searchResults}
                        isSearching={isSearching}
                        selectedUser={selectedSearchUser}
                        onSelectUser={setSelectedSearchUser}
                        onClearSelection={() => setSelectedSearchUser(null)}
                        requests={requests}
                        onAccept={handleAcceptRequest}
                        onDecline={handleDeclineRequest}
                        actionLoading={actionLoading}
                    />

                    <button
                        type="button"
                        className="friends_invite_btn"
                        onClick={handleInviteMember}
                        disabled={
                            actionLoading.inviteUserId ===
                            selectedSearchUser?.id
                        }
                    >
                        {actionLoading.inviteUserId === selectedSearchUser?.id
                            ? "Sending..."
                            : "+ Invite Member"}
                    </button>
                </div>
            </div>

            {requests.length > 0 && (
                <section className="friends_section_card">
                    <div className="friends_section_header">
                        <h2>Friend Requests</h2>
                        <span className="friends_new_badge">
                            {requests.length} NEW
                        </span>
                    </div>

                    <div className="friends_requests_list">
                        {requests.map((request) => (
                            <FriendRequestItem
                                key={request.id}
                                request={request}
                                onAccept={handleAcceptRequest}
                                onDecline={handleDeclineRequest}
                                isAccepting={
                                    actionLoading.acceptId === request.id
                                }
                                isDeclining={
                                    actionLoading.declineId === request.id
                                }
                            />
                        ))}
                    </div>
                </section>
            )}

            <section className="friends_section_card">
                <div className="friends_section_header">
                    <h2>All Friends</h2>
                    <span className="friends_count_label">
                        {friends.length}{" "}
                        {friends.length === 1 ? "Friend" : "Friends"}
                    </span>
                </div>

                {friends.length === 0 ? (
                    <p className="friends_empty_state">
                        No friends yet. Search above to connect with members.
                    </p>
                ) : (
                    <div className="friends_list">
                        {friends.map((friend) => (
                            <FriendListItem
                                key={friend.id}
                                friend={friend}
                                onRemove={setFriendToRemove}
                                isRemoving={
                                    actionLoading.removeId === friend.id
                                }
                            />
                        ))}
                    </div>
                )}
            </section>

            {friendToRemove && (
                <ConfirmationModal
                    title="Remove friend?"
                    message={`Are you sure you want to remove ${friendToRemove.name} from your friends?`}
                    confirmText="Remove Friend"
                    cancelText="Cancel"
                    variant="danger"
                    isLoading={actionLoading.removeId === friendToRemove.id}
                    onConfirm={handleRemoveFriend}
                    onClose={() => setFriendToRemove(null)}
                />
            )}
        </div>
    );
};

export default FriendsPage;
