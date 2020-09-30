import * as actions from "store/actionNames";

export function appOnFormDirty(isFormDirty = true) {
  return {
    type: actions.APP_ON_FORM_DIRTY,
    isFormDirty: isFormDirty,
  };
}

export function appFetchUser() {
  return {
    type: actions.APP_FETCH_USER,
  };
}

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: actions.APP_ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: actions.APP_CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: actions.APP_REMOVE_SNACKBAR,
  key,
});

export const increaseLoading = () => {
  return {
    type: actions.APP_LOADING_INCREASE,
  };
};

export const decreaseLoading = () => ({
  type: actions.APP_LOADING_DECREASE,
});

export const finishSavingData = (data) => ({
  type: actions.APP_FINISH_SAVING_DATA,
  data: data,
});
