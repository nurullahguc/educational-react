import { toast, Bounce } from "react-toastify";
import moment from "moment-timezone";

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
            autoClose: 1000,
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

export const globalMoment = (date, format = "DD.MM.YYYY") => {
    if (!date) return null
    const timezone = 'Europe/Istanbul';
    const language = 'en';

    moment.locale(language);
    return moment.tz(date, timezone).format(format);
}

export const delay = (callback, ms) => {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, ms);
    };
};