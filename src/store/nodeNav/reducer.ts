import * as actions from "store/actionNames";
import { BaseAction } from "../common";

export interface IGuidelineState {
  direction: string | null;
}
const initialState = {
  direction: null,
};

export default function guidelineReducer(
  state: IGuidelineState = initialState,
  action: BaseAction
) {
  switch (action.type) {
    case actions.NODE_NAV_TURN:
      return { ...state, ...{ direction: action.payload } };
    default:
      return state;
  }
}
