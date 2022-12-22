const isValidEnum = (value) => {
    let arr = ['regular', 'special'];
    return arr.includes(value);
}

export {isValidEnum}