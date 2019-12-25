function success(message) {
    return { type: 'SUCCESS', message };
}

function error(message) {
    console.log(message);
    return { type: 'ERROR', message };
}

function primary(message) {
    return { type: 'PRIMARY', message };
}

function clear() {
    return { type: 'CLEAR' };
}

const alertActions = {
    success,
    error,
    clear,
    primary
};
export default alertActions;