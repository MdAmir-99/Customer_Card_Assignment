const isValidField = (value) => {
    if(value === null || typeof value === 'undefined') return false;
    if(typeof value === 'string' && value.trim().length === 0) return false;
    return true;   
}

const isValidBody = (value) => {
    return Object.keys(value).length !== 0;
}

export { isValidField, isValidBody }