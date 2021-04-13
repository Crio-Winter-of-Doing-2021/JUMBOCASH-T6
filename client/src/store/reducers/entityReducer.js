import {
  ADD_ENTITY_LOADING,
  ADD_ENTITY_SUCCESS,
  ADD_ENTITY_FAIL,
  EDIT_ENTITY_LOADING,
  EDIT_ENTITY_SUCCESS,
  EDIT_ENTITY_FAIL,
  DELETE_ENTITY_LOADING,
  DELETE_ENTITY_SUCCESS,
  DELETE_ENTITY_FAIL,
  GET_ENTITIES_LOADING,
  GET_ENTITIES_SUCCESS,
  GET_ENTITIES_FAIL,
} from '../types';

const initialState = {
  entities: [],
  entitiesMap: {},
  isLoading: false,
  isUpdating: false,
  error: '',
  updateError:false
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ENTITIES_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case EDIT_ENTITY_LOADING:
    case DELETE_ENTITY_LOADING:
    case ADD_ENTITY_LOADING:
      return {
        ...state,
        isUpdating: true,
      };
    case GET_ENTITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: payload.entities,
        // Maintain a map of entity with its entityId
        entitiesMap: payload.entities.reduce((acc, entity) => {
          acc[entity.id] = entity;
          return acc;
        }, {}),
      };
    case ADD_ENTITY_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        entities: [payload.entity, ...state.entities],
        entitiesMap:{[payload.entity.id]:payload.entity,...state.entitiesMap,}
      };
    case DELETE_ENTITY_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        entities: state.entities.filter((x) => x.id !== payload.entity.id),
      };
    case EDIT_ENTITY_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        entities: state.entities.map((x) => {
          if (x.id === payload.entity.id) return payload.entity;
          return x;
        }),
        entitiesMap:{[payload.entity.id]:payload.entity,...state.entitiesMap,}
      };
    case DELETE_ENTITY_FAIL:
    case EDIT_ENTITY_FAIL:
    case ADD_ENTITY_FAIL:
      return {
        ...state,
        isUpdating: false,
        updateError: true
      };
    case GET_ENTITIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error:'Failed to fetch entities'
      };
    default:
      return state;
  }
}
