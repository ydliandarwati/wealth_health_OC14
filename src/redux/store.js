import { configureStore } from '@reduxjs/toolkit'
import { employeeReducer} from './employee'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// to clean local storage
// localStorage.removeItem('persist:root')

// store is saved in localStorage (storage from redux)
const persistConfig = {
  key: 'root',
  storage,
}
// persist reduxer
const persistedReducer = persistReducer(persistConfig, employeeReducer)

export const store = configureStore({
    reducer: persistedReducer, 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE],
            },
        }),

})

// create exportable persist store
export const persistor = persistStore(store)


