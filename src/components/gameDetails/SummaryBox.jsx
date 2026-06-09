const SummaryBox = ({ label, value }) => {
    return (
        <div className="summary_box">
            <span>{label}</span>

            <strong>{value}</strong>
        </div>
    );
};

export default SummaryBox;