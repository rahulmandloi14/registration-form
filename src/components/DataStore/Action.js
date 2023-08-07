
export const addUser = (user) => ({
    type: 'ADD_USER',
    payload: user,
  });
  
  export const updateUser = (userId, userData) => ({
    type: 'UPDATE_USER',
    payload: { userId, userData },
  });
  
  export const deleteUser = (userId) => ({
    type: 'DELETE_USER',
    payload: userId,
  });
  