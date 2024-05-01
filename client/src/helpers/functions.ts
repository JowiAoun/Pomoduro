export const getUserIdFromCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; POMODURO-AUTH=`);

  if (parts && parts.length >= 1) {
    const part = parts.pop();
    if (part) {
      return part.split(";")[0];
    }
  }

  return undefined;
};
