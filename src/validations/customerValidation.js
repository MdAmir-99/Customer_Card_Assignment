const isValidName = (value) => {
    return /^[A-Za-z]{2,10}$/.test(value);
}

const isValidNumber = (value) => {
    return /^[6-9]{1}[0-9]{9}$/.test(value);
}

const isValidDate = (value) => {
    return /^([1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(value); // DD-MM-YYYY
}


const isValidEmail = function (email) {
    return (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email))
}




export { isValidName, isValidNumber, isValidDate, isValidEmail }
