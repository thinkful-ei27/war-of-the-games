import React from "react";

export default function Modal(props) {
  const { handleClick, handleCancel } = props;
  return (
    <div className="nes-dialog is-dark" id="dialog-dark">
      <form method="dialog">
        <p className="title">Are You Sure?</p>
        <p>
          Confirming this action will remove this game from your
          reccomendations.
        </p>
        <p className="title">Do you wish to continue?</p>
        <menu className="dialog-menu">
          <button
            onClick={() => handleCancel()}
            type="button"
            className="nes-btn"
          >
            Cancel
          </button>
          <button
            onClick={() => handleClick()}
            type="button"
            className="nes-btn is-primary"
          >
            Confirm
          </button>
        </menu>
      </form>
    </div>
  );
}
