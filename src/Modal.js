import './App.css';

function Modal(props) {
	const modalStyling = {
		visibility: props.isOpen ? "visible" : "hidden"
	}

	return (
		<div className="modal" style={modalStyling}>
			<div className="modalOverlay" onClick={props.onClose}></div>
			<div className={`modalContainer${props.isOpen ? '' : ' modalContainerClosed'}`}>
				{props.children}
			</div>
		</div>
	)
}

export default Modal;