import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGame, defaultValue } from 'app/shared/model/game.model';
import { any } from 'prop-types';

export const ACTION_TYPES = {
  FETCH_GAME_LIST: 'game/FETCH_GAME_LIST',
  FETCH_GAME: 'game/FETCH_GAME',
  CREATE_GAME: 'game/CREATE_GAME',
  UPDATE_GAME: 'game/UPDATE_GAME',
  DELETE_GAME: 'game/DELETE_GAME',
  WHEREAMI: 'game/WHEREAMI',
  PREJOIN_GAME: 'game/PREJOIN_GAME',
  JOIN_GAME: 'game/JOIN_GAME',
  STATE_GAME: 'game/STATE_GAME',
  RESET: 'game/RESET',
  SET_PARI: 'game/SET_PARI'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGame>,
  entity: defaultValue,
  stateGame: any,
  IdGame: any,
  updating: false,
  updateSuccess: false,
  joinable: false
};

export type GameState = Readonly<typeof initialState>;

// Reducer

export default (state: GameState = initialState, action): GameState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GAME_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_GAME):
    case REQUEST(ACTION_TYPES.UPDATE_GAME):
    case REQUEST(ACTION_TYPES.DELETE_GAME):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_GAME_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GAME):
    case FAILURE(ACTION_TYPES.CREATE_GAME):
    case FAILURE(ACTION_TYPES.UPDATE_GAME):
    case FAILURE(ACTION_TYPES.DELETE_GAME):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_GAME_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_GAME):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_GAME):
    case SUCCESS(ACTION_TYPES.UPDATE_GAME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_GAME):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case SUCCESS(ACTION_TYPES.PREJOIN_GAME):
      return {
        ...state,
        joinable: true
      };
    case FAILURE(ACTION_TYPES.PREJOIN_GAME):
      return {
        ...state,
        joinable: false
      };
    case SUCCESS(ACTION_TYPES.WHEREAMI):
      return {
        ...state,
        IdGame: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.STATE_GAME):
      return {
        ...state,
        stateGame: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/games';

// Actions

export const getEntities: ICrudGetAllAction<IGame> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GAME_LIST,
  payload: axios.get<IGame>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const isGameJoinable: ICrudGetAction<Boolean> = id => ({
  type: ACTION_TYPES.PREJOIN_GAME,
  payload: axios.get<Boolean>(`${apiUrl}/pre-join?cacheBuster=${new Date().getTime()}&id=` + id)
});
export const JoinGame: ICrudPutAction<void> = id => ({
  type: ACTION_TYPES.JOIN_GAME,
  payload: axios.post<void>(`${apiUrl}/join?cacheBuster=${new Date().getTime()}&id=` + id)
});

export const setPari: ICrudPutAction<any> = (id, nbDe, valeurDe) => ({
  type: ACTION_TYPES.SET_PARI,
  payload: axios.post<void>(`${apiUrl}/setPari?id=` + id + `&nbDe=` + nbDe + `&ValeurDe=` + valeurDe)
});

export const callLier: ICrudPutAction<any> = id => ({
  type: ACTION_TYPES.SET_PARI,
  payload: axios.post<void>(`${apiUrl}/callLier?id=` + id)
});

export const whereAmI: ICrudGetAction<any> = id => ({
  type: ACTION_TYPES.WHEREAMI,
  payload: axios.get<any>(`${apiUrl}/whereAmI`)
});

export const getEntity: ICrudGetAction<IGame> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GAME,
    payload: axios.get<IGame>(requestUrl)
  };
};

export const getGameState: ICrudGetAction<any> = id => {
  const requestUrl = `${apiUrl}/state?id=` + id;
  return {
    type: ACTION_TYPES.STATE_GAME,
    payload: axios.get<any>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IGame> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GAME,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGame> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GAME,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGame> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GAME,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
