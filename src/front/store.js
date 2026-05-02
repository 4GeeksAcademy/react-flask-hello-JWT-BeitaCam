export const initialStore = () => {
  return {
    message: null,
    users: [],

    // 🔐 AUTH
    user: null,
    token: localStorage.getItem("token") || null
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    // 🔹 Guardar mensaje (si usas /hello)
    case "set_message":
      return {
        ...store,
        message: action.payload
      };

    // 🔹 Guardar usuarios (para probar API)
    case "set_users":
      return {
        ...store,
        users: action.payload
      };

    // 🔐 LOGIN
    case "login":
      localStorage.setItem("token", action.payload.token);
      return {
        ...store,
        user: action.payload.user || null,
        token: action.payload.token
      };

    // 🔓 LOGOUT
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
