import * as actions from "store/actionNames";

const initialState = {
  meals: [],
  currentMeal: null,
};

export default function mealReducer(state = initialState, action) {
  switch (action.type) {
    case actions.MEAL_FETCH_RECEIVED:
      return { ...state, ...{ meals: action.meals } };
    case actions.MEAL_FETCH_DETAIL_RECEIVED:
      return { ...state, ...{ currentMeal: action.meal } };
    default:
      return state;
  }
}
