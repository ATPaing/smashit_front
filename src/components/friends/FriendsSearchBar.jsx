import { useEffect, useRef, useState } from "react";

import "./FriendsSearchBar.css";

const MIN_SEARCH_LENGTH = 2;

const highlightMatch = (text, query) => {
    if (!query.trim()) {
        return text;
    }

    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.trim().toLowerCase();
    const matchIndex = normalizedText.indexOf(normalizedQuery);

    if (matchIndex === -1) {
        return text;
    }

    return (
        <>
            {text.slice(0, matchIndex)}
            <mark className="friends_search_highlight">
                {text.slice(matchIndex, matchIndex + normalizedQuery.length)}
            </mark>
            {text.slice(matchIndex + normalizedQuery.length)}
        </>
    );
};

const FriendsSearchBar = ({
    searchQuery,
    onSearchQueryChange,
    searchResults,
    isSearching,
    selectedUser,
    onSelectUser,
    onClearSelection,
    requests,
    onAccept,
    onDecline,
    actionLoading,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    useEffect(() => {
        setActiveIndex(-1);
    }, [searchResults, searchQuery]);

    useEffect(() => {
        if (searchQuery.trim().length >= MIN_SEARCH_LENGTH) {
            setDropdownOpen(true);
        } else {
            setDropdownOpen(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getRequestIdForUser = (userId) => {
        const request = requests.find(
            (item) => item.requester.id === userId,
        );
        return request?.id;
    };

    const handleSelectUser = (user) => {
        onSelectUser(user);
        onSearchQueryChange(user.name);
        setDropdownOpen(false);
        setActiveIndex(-1);
    };

    const handleInputChange = (event) => {
        onSearchQueryChange(event.target.value);
        onClearSelection();
        setDropdownOpen(event.target.value.trim().length >= MIN_SEARCH_LENGTH);
    };

    const handleKeyDown = (event) => {
        if (!dropdownOpen || searchQuery.trim().length < MIN_SEARCH_LENGTH) {
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (searchResults.length === 0) return;

            setActiveIndex((prev) =>
                prev < searchResults.length - 1 ? prev + 1 : 0,
            );
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (searchResults.length === 0) return;

            setActiveIndex((prev) =>
                prev > 0 ? prev - 1 : searchResults.length - 1,
            );
        }

        if (event.key === "Escape") {
            setDropdownOpen(false);
            setActiveIndex(-1);
        }

        if (event.key === "Enter") {
            event.preventDefault();

            if (activeIndex >= 0 && searchResults[activeIndex]) {
                const user = searchResults[activeIndex];

                if (user.relationshipStatus === "NONE") {
                    handleSelectUser(user);
                }
            }
        }
    };

    useEffect(() => {
        if (activeIndex < 0 || !listRef.current) return;

        const activeItem = listRef.current.children[activeIndex];
        activeItem?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    const renderStatusAction = (user, index) => {
        switch (user.relationshipStatus) {
            case "FRIENDS":
                return (
                    <span className="friends_search_status friends_search_status_friends">
                        Friends
                    </span>
                );

            case "PENDING_SENT":
                return (
                    <span className="friends_search_status friends_search_status_pending">
                        Request Sent
                    </span>
                );

            case "PENDING_RECEIVED": {
                const requestId = getRequestIdForUser(user.id);
                const isAccepting = actionLoading.acceptId === requestId;
                const isDeclining = actionLoading.declineId === requestId;

                return (
                    <div className="friends_search_inline_actions">
                        <button
                            type="button"
                            className="friends_search_accept_btn"
                            onClick={(event) => {
                                event.stopPropagation();
                                if (requestId) onAccept(requestId);
                            }}
                            disabled={!requestId || isAccepting || isDeclining}
                        >
                            {isAccepting ? "..." : "Accept"}
                        </button>
                        <button
                            type="button"
                            className="friends_search_reject_btn"
                            onClick={(event) => {
                                event.stopPropagation();
                                if (requestId) onDecline(requestId);
                            }}
                            disabled={!requestId || isAccepting || isDeclining}
                        >
                            {isDeclining ? "..." : "Decline"}
                        </button>
                    </div>
                );
            }

            default:
                return (
                    <span className="friends_search_hint">
                        {index === activeIndex ? "Press Enter" : "Select"}
                    </span>
                );
        }
    };

    const showDropdown =
        dropdownOpen && searchQuery.trim().length >= MIN_SEARCH_LENGTH;

    const showNoResults =
        !isSearching &&
        searchResults.length === 0 &&
        searchQuery.trim().length >= MIN_SEARCH_LENGTH;

    return (
        <div className="friends_search_wrapper" ref={wrapperRef}>
            <div
                className={`friends_search_input_row ${showDropdown ? "friends_search_input_row_open" : ""}`}
            >
                <span className="friends_search_icon" aria-hidden="true">
                    ⌕
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    role="combobox"
                    aria-expanded={showDropdown}
                    aria-autocomplete="list"
                    aria-controls="friends-search-listbox"
                    aria-activedescendant={
                        activeIndex >= 0
                            ? `friends-search-option-${activeIndex}`
                            : undefined
                    }
                    placeholder="Find new friends..."
                    value={searchQuery}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (searchQuery.trim().length >= MIN_SEARCH_LENGTH) {
                            setDropdownOpen(true);
                        }
                    }}
                    autoComplete="off"
                />
            </div>

            {selectedUser && (
                <p className="friends_search_selected">
                    Selected: <strong>{selectedUser.name}</strong>
                </p>
            )}

            {showDropdown && (
                <div
                    id="friends-search-listbox"
                    role="listbox"
                    className="friends_search_dropdown"
                    ref={listRef}
                >
                    {isSearching && (
                        <p className="friends_search_message">Searching...</p>
                    )}

                    {showNoResults && (
                        <p className="friends_search_message">No users found.</p>
                    )}

                    {!isSearching &&
                        searchResults.map((user, index) => {
                            const isSelectable = user.relationshipStatus === "NONE";
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={user.id}
                                    id={`friends-search-option-${index}`}
                                    role="option"
                                    aria-selected={isActive}
                                    className={`friends_search_result ${isActive ? "friends_search_result_active" : ""} ${isSelectable ? "friends_search_result_selectable" : ""}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => {
                                        if (isSelectable) {
                                            handleSelectUser(user);
                                        }
                                    }}
                                >
                                    <div className="friends_search_result_info">
                                        <p className="friends_search_result_name">
                                            {highlightMatch(user.name, searchQuery)}
                                        </p>
                                        <p className="friends_search_result_email">
                                            {highlightMatch(user.email, searchQuery)}
                                        </p>
                                    </div>
                                    {renderStatusAction(user, index)}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default FriendsSearchBar;
