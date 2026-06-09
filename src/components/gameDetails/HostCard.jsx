import Avatar from "react-avatar";

const HostCard = ({ host, avatarColors }) => {
    return (
        <div className="host_card">
            <Avatar
                name={host.name}
                round
                size="72"
                colors={avatarColors}
            />

            <h3>{host.name}</h3>

            <div className="reliability_bar">
                <div
                    style={{
                        width: `${host.reliability}%`,
                    }}
                />
            </div>

            <strong>{host.reliability}% Reliability</strong>
        </div>
    );
};

export default HostCard;