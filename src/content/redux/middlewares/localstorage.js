// function needProcessMiddleware(action, middlewareName) {
//     const isFieldExist = (action && action.meta && action.meta[middlewareName]);

//     return !!isFieldExist;
// }

// const localStorage = store => next => action => {
//     let result = next(action);

//     if (!needProcessMiddleware(action, 'localStorage')) return result;

//     const localStorageActions = action.meta.localStorage;

//     localStorageActions.forEach(function (localStorageAction) {
//         const {
//             key,
//             value,
//         } = localStorageAction;

//         if (key && value) {
//             chrome.storage.local.set({[key]: value}, () => {
//                 console.log("save to localStorage", {[key]: value});
//             });
//         } else if (localStorageAction.remove) {
//             contentLSChannel.subject('localStorage.remove').next({
//                 key,
//             });
//         }
//     });

//     return result;
// };

// export default localStorage;
