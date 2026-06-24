import { useState } from "react";
import "./RsvpModal.css";

const RsvpModal = ({ game, currentStatus, onClose, onSubmit, isSubmitting = false }) => {
    const [selectedStatus, setSelectedStatus] = useState(
        currentStatus || "not_sure",
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            gameId: game.id,
            rsvpStatus: selectedStatus,
        });
    };

    return (
        <div className="modal_overlay">
            <form className="rsvp_modal" onSubmit={handleSubmit}>
                <div className="rsvp_header">
                    <div className="rsvp_icon_wrapper">
                        <span>🏸</span>
                    </div>

                    <div>
                        <h2>Update Your RSVP</h2>
                        <p className="rsvp_subtitle">
                            Let the host know if you’ll be joining.
                        </p>
                    </div>
                </div>

                <div className="rsvp_game_info">
                    <p className="rsvp_game_title">{game.title}</p>

                    <div className="rsvp_location_row">
                        <span>📍</span>
                        <p className="rsvp_game_location">
                            {game.location}
                        </p>
                    </div>
                </div>

                <div className="rsvp_divider"></div>

                <div className="rsvp_response_section">
                    <p className="response_title">Your response</p>

                    <div className="rsvp_options">
                        <label
                            className={
                                selectedStatus === "going"
                                    ? "active going"
                                    : ""
                            }
                        >
                            <input
                                type="radio"
                                name="rsvpStatus"
                                value="going"
                                checked={selectedStatus === "going"}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            />

                            <span>Going</span>
                        </label>

                        <label
                            className={
                                selectedStatus === "not_sure"
                                    ? "active not_sure"
                                    : ""
                            }
                        >
                            <input
                                type="radio"
                                name="rsvpStatus"
                                value="not_sure"
                                checked={selectedStatus === "not_sure"}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            />

                            <span>Not sure</span>
                        </label>

                        <label
                            className={
                                selectedStatus === "not_going"
                                    ? "active not_going"
                                    : ""
                            }
                        >
                            <input
                                type="radio"
                                name="rsvpStatus"
                                value="not_going"
                                checked={selectedStatus === "not_going"}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            />

                            <span>Not going</span>
                        </label>
                    </div>
                </div>

                <div className="modal_actions">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cancel_btn"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="submit_btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Saving..." : "Save Response"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RsvpModal;