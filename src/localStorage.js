import Cookies from 'universal-cookie';

export const loadState = () => {
  try {
    const cookies = new Cookies();
    const state = cookies.get('state', { path: '/' });
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const cookies = new Cookies();
    cookies.set('state', state, { path: '/' });
  } catch (err) {
    console.error('Error while saving state', err);
  }
};
