const initialTemplates = {
    templates: []
  };
  
  export function templateReducer(state = initialTemplates, action) {
    switch (action.type) {
      case "SET_TEMPLATES": {
        return {
          ...state,
          templates: action.payload
        }
      }

      case "ADD_TEMPLATE": {
        return {
          ...state,
          templates: [action.payload, ...state.templates]
        }
      }

      default:
        return state;
    }
  }