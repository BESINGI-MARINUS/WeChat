import axios from 'axios';

export const login = async (email, password) => {
  try {
    await axios.post('/api/v1/users/login', { email, password });

    window.setTimeout(() => location.assign('/linkup'), 1500);
  } catch (error) {
    alert(error.response.data.message);
    window.setTimeout(() => location.reload(), 1000);
  }
};

export const signup = async (credentials) => {
  try {
    await axios.post('/api/v1/users/signup', credentials);

    window.setTimeout(() => location.assign('/linkup'), 1500);
  } catch (error) {
    alert(error.response.data.message);
    window.setTimeout(() => location.reload(), 1000);
  }
};
