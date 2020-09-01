export const PAGES = {
  login: '/login',
  signup: '/signup',
  forgot: '/forgot',
};

export const navigateToHandler = (history, link) => () => {
  history.push(link);
};
