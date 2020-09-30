import * as actions from "store/actionNames";

const initialState = {
  foods: [],
  currentFood: null,
};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FOOD_FETCH_RECEIVED:
      return { ...state, ...{ foods: action.foods } };
    case actions.FOOD_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentFood: action.food } };
    default:
      return state;
  }
}
