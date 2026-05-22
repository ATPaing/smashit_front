import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./EditGameModal.css";

const EditGameModal = ({ game, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: game.title,
        location: game.location,
        startTime: new Date(game.startDateTime),
        endTime: new Date(game.endDateTime),
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.endTime <= formData.startTime) {
            alert("End time must be later than start time.");
            return;
        }

        onSave({
            ...game,
            title: formData.title,
            location: formData.location,
            startDateTime: formData.startTime.toISOString(),
            endDateTime: formData.endTime.toISOString(),
        });

        onClose();
    };

    return (
        <div className="modal_overlay">
            <form className="editGame_modal" onSubmit={handleSubmit}>
                <div className="editGame_modal_header">
                    <h2>Edit Game</h2>

                    <button
                        type="button"
                        className="editGame_closeBtn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                <label className="editGame_label">
                    Game Title
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>

                <label className="editGame_label">
                    Location
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Start Date & Time
                    <DatePicker
                        selected={formData.startTime}
                        onChange={(date) =>
                            setFormData((prev) => ({
                                ...prev,
                                startTime: date,
                            }))
                        }
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="dd MMM yyyy, h:mm aa"
                        className="editGame_datePicker"
                    />
                </label>

                <label>
                    End Date & Time
                    <DatePicker
                        selected={formData.endTime}
                        onChange={(date) =>
                            setFormData((prev) => ({
                                ...prev,
                                endTime: date,
                            }))
                        }
                        showTimeSelect
                        timeIntervals={15}
                        dateFormat="dd MMM yyyy, h:mm aa"
                        className="editGame_datePicker"
                        minDate={formData.startTime}
                    />
                </label>

                <div className="editGame_modal_actions">
                    <button
                        type="button"
                        className="editGame_cancelBtn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="editGame_saveBtn">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditGameModal;
