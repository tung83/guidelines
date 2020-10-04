import * as actions from "store/actionNames";
import { BaseAction } from "../common";

export function nodeNavTurn(direction: string): BaseAction {
  return {
    type: actions.NODE_NAV_TURN,
    payload: direction,
  };
}
