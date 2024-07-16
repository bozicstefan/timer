import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    //   passing in reference to outside ref, and connecting it with dialog ref and its built-in showModal method,
    // which is exposed as .open() method in the outside ref
    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });

    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You lost </h2>}
        {!userLost && <h2>Your score: {score} </h2>}
        <p>
          Target time was{" "}
          <strong>
            {targetTime} {targetTime > 1 ? "seconds" : "second"}
          </strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds left</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);
