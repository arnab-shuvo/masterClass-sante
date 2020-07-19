import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyInfo = (msg) => toast.info(msg, {
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
});

export const notifyWarn = (msg) => toast.warn(msg, {
    position: "top-right",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false
});

const Notification = () => {
    return ( 
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar newestOnTop
            closeOnClick rtl={false} pauseOnVisibilityChange draggable={false} pauseOnHover />
     );
}
 
export default Notification;