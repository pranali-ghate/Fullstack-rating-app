// src/utils/auth.js

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };
  
  export const hasRole = (role) => {
    const user = getUser();
    return user && user.role === role;
  };
  