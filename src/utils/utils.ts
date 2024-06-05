import bcrypt from "bcrypt";

class Utils {

    // Comprueba si un valor es un entero
    isInteger(value: any) {
        return Number.isInteger(value);
    }

    // Comprueba si un valor es un número positivo
    isPositiveNumber(value: any) {
        return typeof value === 'number' && value > 0;
    }

    // Comprueba si un valor es una cadena no vacía
    isNonEmptyString(value: any) {
        return typeof value === 'string' && value.trim() !== '';
    }

    // Comprueba si un valor es un arreglo no vacío
    isNonEmptyArray(value: any) {
        return Array.isArray(value) && value.length > 0;
    }

    // Comprueba si un valor es un objeto
    isObject(value: any) {
        return typeof value === 'object' && value !== null;
    }

    // Comprueba si un valor es una función
    isFunction(value: any) {
        return typeof value === 'function';
    }

    // Comprueba si un valor es un correo electrónico válido
    isValidEmail(email: any) {
        // Expresión regular para la validación de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Comprueba si un valor es una URL válida
    isValidURL(url: any) {
        // Expresión regular para la validación de URL
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(url);
    }

    // Comprueba si un valor es una fecha válida
    isValidDate(date: any) {
        return !isNaN(new Date(date).getTime());
    }

    encrypt(password: string){
        return bcrypt.hash(password, 10);
    }

    compareEncrypt(hashedPassword: string, password: string){
        return bcrypt.compare(hashedPassword, password);
    }
}

export {Utils};
