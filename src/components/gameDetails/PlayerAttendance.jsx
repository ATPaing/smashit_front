import Avatar from "react-avatar";
import StatusBadge from "./StatusBadge";
import AttendanceBadge from "./AttendanceBadge";

const PlayerAttendance = ({ players, avatarColors }) => {
    return (
        <section className="attendance_card">
            <div className="section_header">
                <h2>Player Attendance</h2>

                <span>
                    {players.length} Players
                </span>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Role</th>
                        <th>RSVP</th>
                        <th>Attendance</th>
                    </tr>
                </thead>

                <tbody>
                    {players.map((player) => (
                        <tr key={player.id} className='fade_player_row'>
                            <td>
                                <div className="player_cell">
                                    <Avatar
                                        name={player.name}
                                        round
                                        size="38"
                                        colors={
                                            avatarColors
                                        }
                                    />

                                    <strong>
                                        {player.name}
                                    </strong>
                                </div>
                            </td>

                            <td>{player.role}</td>

                            <td>
                                <StatusBadge
                                    status={
                                        player.rsvpStatus
                                    }
                                />
                            </td>

                            <td>
                                <AttendanceBadge
                                    status={
                                        player.attendanceStatus
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default PlayerAttendance;