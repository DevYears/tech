import Cookies from 'universal-cookie';

export const loadState = () => {
  try {
    const cookies = new Cookies();
    const state = cookies.get('state');
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const cookies = new Cookies();
    cookies.set('state', state);
  } catch (err) {
    console.error('Error while saving state', err);
  }
};
