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
          templates: [...state.templates, action.payload]
        }
      }

      default:
        return state;
    }
  }