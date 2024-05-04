export const changeTheme = (theme: string) => {
  const body = document.querySelector('body');
  if (theme === 'light' && body && body.style) {
    body.style.backgroundColor = '#f0f0f0';
    body.style.color = '#242424';
  } else if (theme === 'dark' && body && body.style) {
    body.style.backgroundColor = '#242424';
    body.style.color = '#f0f0f0';
  }
};
