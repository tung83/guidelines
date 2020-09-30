import * as actions from "store/actionNames";

const initialState = {
  isFormDirty: false,
  notifications: [],
  loadingCounter: 0,
  finishSavingData: false,
  user: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actions.APP_ON_FORM_DIRTY:
      return { ...state, ...{ isFormDirty: action.isFormDirty } };
    case actions.APP_FETCH_USER_RECEIVED:
      return { ...state, ...{ user: action.user } };
    case actions.APP_ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };

    case actions.APP_CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case actions.APP_REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };
    case actions.APP_LOADING_INCREASE:
      return {
        ...state,
        loadingCounter: state.loadingCounter + 1,
      };
    case actions.APP_LOADING_DECREASE:
      let newLoading = state.loadingCounter - 1;
      return {
        ...state,
        loadingCounter: newLoading < 0 ? 0 : newLoading,
      };
    case actions.APP_FINISH_SAVING_DATA:
      return {
        ...state,
        finishSavingData: action.data || !state.finishSavingData,
      };

    default:
      return state;
  }
}
