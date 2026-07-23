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

export const handleHttpError = (error, errorBag = false) => {
    if (errorBag) {
        ToastMessage("info", "Coming Soon!", "Error bag coming soon!");
        return true;
    } else {
        if (error?.response?.data?.message) {
            ToastMessage("error", "Error!", error?.response?.data?.message);
        }
    }
}

export const generateRandom = (min, max) => {
    return Math.floor(Math.random() * max) + min;
}
