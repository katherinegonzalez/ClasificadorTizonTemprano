const COOKIE_NAME = 'SESSSION_TOKEN';
const USER_ID = 'USER_ID';

export const setSessionID = (token, userId, rememberMe = false) =>  {
    if (token) {
        const COOKIE_VALUE = token;
    
        if (rememberMe) {
            // Define la duración de la cookie en días (opcional)
            const dueDays = 7;
    
            // Calcula la fecha de vencimiento
            const dueDate = new Date();
            dueDate.setTime(dueDate.getTime() + (dueDays * 24 * 60 * 60 * 1000));
    
            // Convierte la fecha de vencimiento a una cadena en formato UTC
            const dueDateString = dueDate.toUTCString();
    
            // Crea la cookie con el nombre, valor y fecha de vencimiento
            document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; expires=${dueDateString}; path=/`;
            document.cookie = `${USER_ID}=${userId}; expires=${dueDateString}; path=/`;
        } else {
    
            // Crea la cookie con el nombre, valor y fecha de vencimiento
            document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; path=/`;
            document.cookie = `${USER_ID}=${userId}; path=/`;
    
        }
    }     
}

export const deleteCookie = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

const getCookie = (cookieToGet) => {
    // Obtener todas las cookies
    const cookies = document.cookie;

    // Separar las cookies en un array
    const cookieArray = cookies.split(';');

    // Recorrer el array de cookies
    for (let i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim(); // Eliminar espacios en blanco alrededor de la cookie

        // Dividir la cookie en nombre y valor
        var cookieParts = cookie.split('=');
        var cookieName = cookieParts[0];
        var cookieValue = cookieParts[1];

        if (cookieToGet === cookieName) {
            return cookieValue;
        }
    }

    return null;
}

export const getSessionID = () => getCookie(COOKIE_NAME);

export const getUserID = () => getCookie(USER_ID);

export const isAuthenticated = () => !!getSessionID();
