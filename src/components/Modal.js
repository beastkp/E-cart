import React from "react";
import { clearCart } from "../features/card/cardSlice";
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";

const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all items from the cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            onClick={() => {
              dispatch(closeModal());
              dispatch(clearCart());
            }}
          >
            Confirm
          </button>
          <button className="btn clear-btn" onClick={()=>{
            dispatch(closeModal());
          }}>Cancel</button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
