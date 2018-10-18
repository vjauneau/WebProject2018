import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDe, defaultValue } from 'app/shared/model/de.model';

export const ACTION_TYPES = {
  FETCH_DE_LIST: 'de/FETCH_DE_LIST',
  FETCH_DE: 'de/FETCH_DE',
  CREATE_DE: 'de/CREATE_DE',
  UPDATE_DE: 'de/UPDATE_DE',
  DELETE_DE: 'de/DELETE_DE',
  RESET: 'de/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDe>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DeState = Readonly<typeof initialState>;

// Reducer

export default (state: DeState = initialState, action): DeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DE):
    case REQUEST(ACTION_TYPES.UPDATE_DE):
    case REQUEST(ACTION_TYPES.DELETE_DE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DE):
    case FAILURE(ACTION_TYPES.CREATE_DE):
    case FAILURE(ACTION_TYPES.UPDATE_DE):
    case FAILURE(ACTION_TYPES.DELETE_DE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DE):
    case SUCCESS(ACTION_TYPES.UPDATE_DE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DE):
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

const apiUrl = 'api/des';

// Actions

export const getEntities: ICrudGetAllAction<IDe> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DE_LIST,
  payload: axios.get<IDe>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDe> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DE,
    payload: axios.get<IDe>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDe> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
