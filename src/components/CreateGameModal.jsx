import { useState } from "react";
import DatePicker from "react-datepicker";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

import ErrorBox from "./ErrorBox";


import "react-datepicker/dist/react-datepicker.css";
import "./CreateGameModal.css";



function CreateGameModal({ onClose }) {
    const { token } = useAuth();

    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        feeType: "FREE",
        minReliabilityScore: 80,
    });

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleChange = (event) => {
        const { name, value } = event.target;
        setError(null);
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const gameData = {
            name: formData.name,
            location: formData.location,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            feeType: formData.feeType,
            minReliabilityScore: Number(formData.minReliabilityScore),
        };

        try {
            const response = await fetch("http://localhost:3000/game/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(gameData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success("Game created successfully!");

            onClose();
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Something went wrong");
        }
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
                                name="feeType"
                                value={formData.feeType}
                                onChange={handleChange}
                            >
                                <option value="FREE">Free</option>
                                <option value="SPLIT">Split</option>
                            </select>
                        </div>

                        <div className="form_group">
                            <label>Min Reliability Score (%)</label>

                            <input
                                type="number"
                                name="minReliabilityScore"
                                value={formData.minReliabilityScore}
                                onChange={handleChange}
                                min={0}
                                max={100}
                                required
                            />
                        </div>
                    </div>
                    {error && <ErrorBox message={error} />}
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
