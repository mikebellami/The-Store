import React from "react";
import ReactModal from "react-modal";
import styles from "./modal.module.css"

const Modal = ({
	isOpen,
	setIsOpen,
	title,
	size = "l",
	children,
	onClose = () => {},
}) => {
	let modalClass;
	if (size === "xl") {
		modalClass = "modal-xlg";
	} else if (size === "l") {
		modalClass = "modal-lg";
	} else if (size === "sm") {
		modalClass = "";
	} else if (size === "xsm") {
		modalClass = "modal-xsm";
	}
	return (
		<ReactModal
			isOpen={isOpen}
			ariaHideApp={false}
			onRequestClose={() => setIsOpen(false)}
			shouldCloseOnOverlayClick={true}
			className={styles.modal}
			overlayClassName={styles.overlay}
		>
			<div className={`modal-dialog ${modalClass}`} role="document">
				<div className={`modal-content ${styles["app-modal-content"]}`}>
					<div className="modal-header">
						<h4 className={`modal-title ${styles["app-modal-title"]}`}>{title}</h4>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
							onClick={() => {
								setIsOpen(false);
								onClose();
							}}
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body rec-modal-body">{children}</div>
				</div>
			</div>
		</ReactModal>
	);
};

export default Modal;
