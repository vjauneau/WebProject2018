import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IJeu, defaultValue } from 'app/shared/model/jeu.model';

export const ACTION_TYPES = {
  FETCH_JEU_LIST: 'jeu/FETCH_JEU_LIST',
  FETCH_JEU: 'jeu/FETCH_JEU',
  CREATE_JEU: 'jeu/CREATE_JEU',
  UPDATE_JEU: 'jeu/UPDATE_JEU',
  DELETE_JEU: 'jeu/DELETE_JEU',
  RESET: 'jeu/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IJeu>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type JeuState = Readonly<typeof initialState>;

// Reducer

export default (state: JeuState = initialState, action): JeuState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_JEU_LIST):
    case REQUEST(ACTION_TYPES.FETCH_JEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_JEU):
    case REQUEST(ACTION_TYPES.UPDATE_JEU):
    case REQUEST(ACTION_TYPES.DELETE_JEU):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_JEU_LIST):
    case FAILURE(ACTION_TYPES.FETCH_JEU):
    case FAILURE(ACTION_TYPES.CREATE_JEU):
    case FAILURE(ACTION_TYPES.UPDATE_JEU):
    case FAILURE(ACTION_TYPES.DELETE_JEU):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_JEU_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_JEU):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_JEU):
    case SUCCESS(ACTION_TYPES.UPDATE_JEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_JEU):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/jeus';

// Actions

export const getEntities: ICrudGetAllAction<IJeu> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_JEU_LIST,
  payload: axios.get<IJeu>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IJeu> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_JEU,
    payload: axios.get<IJeu>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IJeu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_JEU,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IJeu> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_JEU,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IJeu> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_JEU,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
