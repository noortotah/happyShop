import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAppReducer from './feature/reducers/app.reducer';
import * as fromShoppingCartReducer from './feature/reducers/shopping-cart.reducer';
import * as fromAuthReducer from '../auth/feature/reducers/auth.reducer';
import { storeFreeze } from 'ngrx-store-freeze';

export const storeFeatureKey = 'store';

export interface AppState {
  app: fromAppReducer.State;
  shoppingCart: fromShoppingCartReducer.State;
  auth: fromAuthReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  app: fromAppReducer.reducer,
  shoppingCart: fromShoppingCartReducer.reducer,
  auth: fromAuthReducer.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];
