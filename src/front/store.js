export const initialStore = () => {
  return {
    message: null,
    users: [],

    
    user: null,
    token: localStorage.getItem("token") || null
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {


    case "set_message":
      return {
        ...store,
        message: action.payload
      };

   
    case "set_users":
      return {
        ...store,
        users: action.payload
      };

  
    case "login":
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        user: action.payload.user || null,
        token: action.payload.token
      };

  
    case "logout":
      localStorage.removeItem("token");
      return {
        ...store,
        user: null,
        token: null
      };

    default:
      return store;
  }
}
