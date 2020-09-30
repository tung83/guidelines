import * as actions from "store/actionNames";

const initialState = {
  stories: [],
  currentMenu: null,
  onSaveClickedFoods: null,
  onPutMenu: null,
};

export default function menuReducer(state = initialState, action) {
  switch (action.type) {
    case actions.MENU_FETCH_RECEIVED:
      return { ...state, ...{ stories: action.stories } };
    case actions.MENU_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentMenu: action.menu } };
    case actions.MENU_ON_SAVE_CLICKED:
      return { ...state, ...{ onSaveClickedFoods: action.foods } };
    case actions.MENU_ON_PUT_FOODS:
      return { ...state, ...{ onPutMenu: action.menu } };
    default:
      return state;
  }
}
