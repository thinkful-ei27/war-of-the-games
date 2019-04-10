import React from "react";
import ReactModal from "react-modal";
import "./styles/modal.css";

export default function Modal(props) {
  const { handleModal, onRemove, igdbId, showModal, item } = props;
  return (
    <ReactModal
      appElement={document.getElementById("root")}
      className="Modal"
      overlayClassName="Overlay"
      isOpen={showModal}
    >
      <button
        type="button"
        className="text-xs close-modal"
        onClick={() => handleModal()}
      >
        X
      </button>
      <div className="flex flex-col justify-around items-center h-1 text-xs">
        <p className="text-center modal-content">
          Are you sure you want to remove this game from your {item}
        </p>
        <menu className="flex w-2/3 justify-around">
          <button
            onClick={() => handleModal()}
            className="nes-btn modal"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={() => onRemove(igdbId)}
            className="nes-btn modal is-primary"
            type="button"
          >
            Confirm
          </button>
        </menu>
      </div>
    </ReactModal>
  );
}
