export const PAGES = {
  login: '/login',
  signup: '/signup',
  forgot: '/forgot',
  tasks: '/tasks',
};

export const navigateToHandler = (history, link) => () => {
  history.push(link);
};
