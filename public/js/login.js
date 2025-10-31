import axios from 'axios';

export const login = async (email, password) => {
  const res = await axios.post('/api/v1/users/login', { email, password });

  if (res.data.status === 'error')
    window.setTimeout(() => location.assign('/linkup'), 1500);
};
