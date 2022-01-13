export const tid = () => {
  return Date.now().toString(36) + Math.random().toString(36);
};
