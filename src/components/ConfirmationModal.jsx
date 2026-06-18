import "./ConfirmationModal.css";

const ConfirmationModal = ({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger",
    isLoading = false,
    onConfirm,
    onClose,
}) => {
    return (
        <div className="confirmation_modal_overlay" onClick={onClose}>
            <div
                className="confirmation_modal"
                onClick={(e) => e.stopPropagation()}
            >
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirmation_modal_actions">
                    <button
                        className="confirmation_cancel_btn"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText}
                    </button>

                    <button
                        className={`confirmation_confirm_btn ${variant}`}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Cancelling..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;