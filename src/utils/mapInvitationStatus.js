export const mapRsvpToBackendStatus = (rsvpStatus) => {
    switch (rsvpStatus) {
        case "going":
            return "ACCEPTED";
        case "not_going":
            return "DECLINED";
        case "not_sure":
        default:
            return "PENDING";
    }
};

export const mapBackendStatusToRsvp = (status) => {
    switch (status?.toLowerCase()) {
        case "accepted":
            return "going";
        case "declined":
            return "not_going";
        case "pending":
        default:
            return "not_sure";
    }
};
