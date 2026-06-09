const StatusBadge = ({ status }) => {
    return (
        <span className={`status_badge ${status}`}>
            {status}
        </span>
    );
};

export default StatusBadge;