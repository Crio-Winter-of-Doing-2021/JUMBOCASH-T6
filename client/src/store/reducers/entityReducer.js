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
  entities: [
    // will be populated from backend
    { id: '789327d08-9184-4d57-9f83-f7a646e92a58', userId: '34567', name: 'Entity1', address: 'West Bengal, India', contact: '9876543210' },
    { id: '15327d08-9184-4d57-9f83-f7a646e92a58', userId: '89215', name: 'Entity2', address: 'Assam, India', contact: '8876542310' },
  ],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ENTITIES_LOADING:
    case EDIT_ENTITY_LOADING:
    case DELETE_ENTITY_LOADING:    
    case ADD_ENTITY_LOADING:
      return {
        ...state,
        isLoading: true, 
      };
    case GET_ENTITIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        // entities: payload.entities,
      };
    case ADD_ENTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities:[payload.entity,...state.entities]
      };
    case DELETE_ENTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: state.entities.filter((x) => x.id !== payload.entity.id),
      };
    case EDIT_ENTITY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: state.entities.map((x) => {
          if (x.id === payload.entity.id) return payload.entity;
          return x;
        }),
      };
    case DELETE_ENTITY_FAIL:
    case EDIT_ENTITY_FAIL:
    case ADD_ENTITY_FAIL:
    case GET_ENTITIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
