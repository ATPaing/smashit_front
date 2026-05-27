import { useState } from "react";
import "./MarkAttendanceModal.css";

const AttendanceModal = ({ gameId, players, onClose, onSubmit }) => {
    const [attendance, setAttendance] = useState(() => {
        const initialAttendance = {};

        players.forEach((player) => {
            initialAttendance[player.id] = player.attendanceStatus || "";
        });

        return initialAttendance;
    });

    const handleAttendanceChange = (playerId, status) => {
        setAttendance((prev) => ({
            ...prev,
            [playerId]: status,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const attendanceData = players.map((player) => ({
            playerId: player.id,
            status: attendance[player.id],
        }));

        onSubmit({
            gameId,
            attendance: attendanceData,
        });
    };

    return (
        <div className="modal_overlay">
            <form className="attendance_modal" onSubmit={handleSubmit}>
                <div className="attendance_modal_header">
                    <h2>Mark Attendance</h2>
                    <button type="button" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="attendance_players_list">
                    {players.map((player) => (
                        <div className="attendance_player_row" key={player.id}>
                            <p>{player.name}</p>

                            <div className="attendance_actions">
                                <button
                                    type="button"
                                    className={
                                        attendance[player.id] === "present"
                                            ? "selected present"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleAttendanceChange(
                                            player.id,
                                            "present"
                                        )
                                    }
                                >
                                    Present
                                </button>

                                <button
                                    type="button"
                                    className={
                                        attendance[player.id] === "absent"
                                            ? "selected absent"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleAttendanceChange(
                                            player.id,
                                            "absent"
                                        )
                                    }
                                >
                                    Absent
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="attendance_modal_footer">
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button type="submit">
                        Save Attendance
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AttendanceModal;