const InfoCard = ({ icon, label, title, subtitle }) => {
    return (
        <div className="info_card">
            <div className="info_icon">{icon}</div>

            <span>{label}</span>

            <h3>{title}</h3>

            {subtitle && <p>{subtitle}</p>}
        </div>
    );
};

export default InfoCard;