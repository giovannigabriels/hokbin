const logger = (store) => (next) => (action) => {
  console.log("dispatching", action);
  console.log("prev state", store.getState());
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

export default logger;
