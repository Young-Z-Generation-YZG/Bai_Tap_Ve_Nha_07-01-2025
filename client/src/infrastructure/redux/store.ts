import {
   combineReducers,
   configureStore,
   isRejectedWithValue,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
   PersistConfig,
   persistReducer,
   FLUSH,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   REHYDRATE,
   persistStore,
} from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createPersistStorage } from './persist-storage';

import { authApi } from '~/src/infrastructure/redux/apis/auth.api';
import { productsApi } from '~/src/infrastructure/redux/apis/product.api';
import { userApi } from '~/src/infrastructure/redux/apis/user.api';
import authSlice from '~/src/infrastructure/redux/features/auth/auth.slice';
import searchSlice from '~/src/infrastructure/redux/features/app/search.slice';
import cartSlice from '~/src/infrastructure/redux/features/app/cart.slice';
import bottomtabSlice from '~/src/infrastructure/redux/features/app/bottomtab.slice';
import { categoryApi } from '~/src/infrastructure/redux/apis/category.api';
import wishlistSlice from '~/src/infrastructure/redux/features/app/wishlist.slice';
import { reviewsApi } from '~/src/infrastructure/redux/apis/review.api';
import { invoicesApi } from '~/src/infrastructure/redux/apis/invoice.api';
import { voucherApi } from '~/src/infrastructure/redux/apis/voucher.api';

const storage = createPersistStorage();

const persistConfig: PersistConfig<ReturnType<typeof reducers>> = {
   key: 'root',
   version: 1,
   storage, // Use AsyncStorage via createPersistStorage
   blacklist: [
      authApi.reducerPath,
      productsApi.reducerPath,
      categoryApi.reducerPath,
      userApi.reducerPath,
      invoicesApi.reducerPath,
      reviewsApi.reducerPath,
      voucherApi.reducerPath,
   ], // Exclude API reducers from persistence
   whitelist: ['auth', 'search', 'cart', 'wishlist', 'bottomtab'], // Only persist auth and search slices
};

/**
 * This function is used to get enhancers for debugging (not setup yet, but can be used in future so ignoring for now)
 */
const getEnhancers = (getDefaultEnhancers: any) => {
   return getDefaultEnhancers();
};

/**
 * On api error this will be called
 */
export const rtkQueryLoggerMiddleware =
   (api: any) => (next: any) => (action: any) => {
      if (isRejectedWithValue(action)) {
         console.log('isRejectedWithValue', action.error, action.payload);
         // alert(JSON.stringify(action)); // This is just an example. Replace with your preferred notification method.
      }

      return next(action);
   };

const reducers = combineReducers({
   auth: authSlice,
   search: searchSlice,
   cart: cartSlice,
   wishlist: wishlistSlice,
   bottomtab: bottomtabSlice,
   [authApi.reducerPath]: authApi.reducer,
   [productsApi.reducerPath]: productsApi.reducer,
   [categoryApi.reducerPath]: categoryApi.reducer,
   [userApi.reducerPath]: userApi.reducer,
   [invoicesApi.reducerPath]: invoicesApi.reducer,
   [reviewsApi.reducerPath]: reviewsApi.reducer,
   [voucherApi.reducerPath]: voucherApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const reduxStore = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }).concat(
         authApi.middleware,
         productsApi.middleware,
         categoryApi.middleware,
         userApi.middleware,
         invoicesApi.middleware,
         reviewsApi.middleware,
         voucherApi.middleware,
         rtkQueryLoggerMiddleware,
      ),
   enhancers: getEnhancers,
});

// Enable refetchOnMount and refetchOnReconnect behavior
setupListeners(reduxStore.dispatch);

export default reduxStore;

export const persistor = persistStore(reduxStore);

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
