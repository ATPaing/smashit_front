export const mapBackendAttendanceToFrontend = (status) => {
    switch (status?.toUpperCase()) {
        case "PRESENT":
            return "present";
        case "NO_SHOW":
            return "absent";
        default:
            return "";
    }
};

export const mapFrontendAttendanceToBackend = (status) => {
    switch (status) {
        case "present":
            return "PRESENT";
        case "absent":
            return "NO_SHOW";
        default:
            return null;
    }
};
