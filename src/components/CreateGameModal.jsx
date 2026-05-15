import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./CreateGameModal.css";

function CreateGameModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        fee_type: "free",
        min_reliability_score: 80,
    });

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const gameData = {
            name: formData.name,
            location: formData.location,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            fee_type: formData.fee_type,
            min_reliability_score: Number(formData.min_reliability_score),
        };

        console.log(gameData);
    };

    return (
        <div className="modal_overlay">
            <div className="modal_card">
                <div className="modal_header">
                    <div className="modal_header_text">
                        <h2 className="modal_title">Create New Match</h2>

                        <p className="modal_subtitle">
                            Set up your badminton session details.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="modal_close_btn"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form className="modal_form" onSubmit={handleSubmit}>
                    <div className="form_group">
                        <label>Game Name</label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Friday Night Smash"
                            required
                        />
                    </div>

                    <div className="form_group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Community Court 1"
                            required
                        />
                    </div>

                    <div className="form_row">
                        <div className="form_group">
                            <label>Start Time</label>

                            <DatePicker
                                selected={startTime}
                                onChange={(date) => setStartTime(date)}
                                showTimeSelect
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                                className="datepicker_input"
                                required
                            />
                        </div>

                        <div className="form_group">
                            <label>End Time</label>

                            <DatePicker
                                selected={endTime}
                                onChange={(date) => setEndTime(date)}
                                showTimeSelect
                                timeIntervals={30}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={startTime}
                                className="datepicker_input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form_row">
                        <div className="form_group">
                            <label>Fee Type</label>

                            <select
                                name="fee_type"
                                value={formData.fee_type}
                                onChange={handleChange}
                            >
                                <option value="free">Free</option>
                                <option value="split">Split</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Min Reliability Score (%)</label>

                            <input
                                type="number"
                                name="min_reliability_score"
                                value={formData.min_reliability_score}
                                onChange={handleChange}
                                min={0}
                                max={100}
                                required
                            />
                        </div>
                    </div>

                    <div className="modal_actions">
                        <button
                            type="button"
                            className="cancel_btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button type="submit" className="create_btn">
                            Create Match
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateGameModal;
