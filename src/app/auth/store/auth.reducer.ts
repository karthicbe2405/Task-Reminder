import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState,action: AuthActions.AuthActions) {
  switch (action.type) {
    
    case AuthActions.LOGIN:
      const user = action.payload;

      return {
        ...state,
        user: user
      };

    case AuthActions.LOGOUT:  
      
      return {
          ...state,
          user: null
        };
    
    default:
        return state;

  }
}
