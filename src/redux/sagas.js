import { all } from '@redux-saga/core/effects'
import { watchHeaderActions } from './headerReducer'
import { watcherMoviesActions } from './moviesReducer'

export function* rootSaga() {
  yield all([watchHeaderActions(), watcherMoviesActions()])
}
