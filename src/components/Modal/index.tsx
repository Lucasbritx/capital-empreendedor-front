import React, { FC } from "react";
import "./styles.scss";

interface IModal {
  handleClose?: any;
  show?: boolean;
  children?: any;
}

const Modal: FC<IModal> = ({ handleClose, show, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <section className="modal-main">
        <div className="modal-header">
          <button className="close-button" type="button" onClick={handleClose}>
            X
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Modal;
