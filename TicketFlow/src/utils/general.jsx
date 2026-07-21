import { toast, Bounce } from "react-toastify";

/**
 * ######## Example Usage ######## 
 * ToastMessage('error', 'Error!!', 'Error Description!');
 * ToastMessage('Success', 'Successful!!', 'Successfull description!');
 */

export const ToastMessage = (type, title, message) => {
    return toast[type](
        <div>
            <strong>{title}</strong>
            <div>{message}</div>
        </div>
        , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
}

