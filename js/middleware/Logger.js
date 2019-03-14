export const Logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('DEBUG: dispatching a function.');
    } else {
        console.log('DEBUG: dispatching ', action);
    }
    next(action);
    console.log('DEBUG: next state is ', store.getState());
}