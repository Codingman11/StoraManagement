export const sanitizeObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null || obj[k] == "" || obj[k] == undefined) {
      delete obj[k];
    }
  });
  return obj;
};
