import { ActionReducer, INIT, MetaReducer } from '@ngrx/store';

import { authActionTypes } from './authentication/actions';

export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action != null && action.type === authActionTypes.LogoutSuccess) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [logout];
