function alert(state = {}, action) {
  switch (action.type) {
    case 'SUCCESS':
      return {
        type: 'success',
        message: action.message
      };
    case 'ERROR':
      return {
        type: 'error',
        message: action.message
      };
    case 'CLEAR':
      return {};
    default:
      return state
  }
}
export default alert;