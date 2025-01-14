import {toast} from "react-toastify"

export const ToastHandler = {
    error: handleError,
    success: handleSuccess
}

async function handleSuccess(message: string): Promise<void> {
    toast.success(message, {
        position: 'bottom-right'
    });
     
    await delay(2000);
}

async function handleError(message: string): Promise<void> {
    toast.error(message, {
        position: 'bottom-right'
    });
     
    await delay(2000);
}

function delay(timeout: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeout));
}