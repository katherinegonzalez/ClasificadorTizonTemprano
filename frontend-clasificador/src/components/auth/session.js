const COOKIE_NAME = 'SESSSION_TOKEN';
export const setSessionID = (token) =>  {
    const COOKIE_VALUE = token;
    // Define la duración de la cookie en días (opcional)
    const dueDays = 7;

    // Calcula la fecha de vencimiento
    const dueDate = new Date();
    dueDate.setTime(dueDate.getTime() + (dueDays * 24 * 60 * 60 * 1000));

    // Convierte la fecha de vencimiento a una cadena en formato UTC
    const dueDateString = dueDate.toUTCString();

    // Crea la cookie con el nombre, valor y fecha de vencimiento
    document.cookie = `${COOKIE_NAME}=${COOKIE_VALUE}; expires=${dueDateString}; path=/`;
}

export const getSessionID = () =>  {
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

        if (COOKIE_NAME === cookieName) {
            return cookieValue;
        }
    }

    return null;
}

export const isAuthenticated = () => !!getSessionID();
