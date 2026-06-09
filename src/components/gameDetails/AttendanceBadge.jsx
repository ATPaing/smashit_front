const AttendanceBadge = ({ status }) => {
    if (!status) {
        return (
            <span className="attendance_unmarked">
                Unmarked
            </span>
        );
    }

    return (
        <span
            className={`attendance_badge ${status}`}
        >
            {status}
        </span>
    );
};

export default AttendanceBadge;