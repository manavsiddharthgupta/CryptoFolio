import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import BackDrop from "./BackDrop";
import CoinDescription from "./CoinDescription";

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop
          onClick={() => {
            props.onsetModal();
          }}
        />,
        document.getElementById("modal")
      )}{" "}
      {ReactDOM.createPortal(
        <CoinDescription theme={props.themeStatus} coinName={props.onCoinId} />,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};
export default Modal;
