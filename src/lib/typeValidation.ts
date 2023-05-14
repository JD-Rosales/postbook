export const isString = (
  data:
    | string
    | {
        [key: string]: string[];
      }
) => {
  if (typeof data === 'string') {
    return true;
  }
  return false;
};

export const isObject = (
  data:
    | string
    | {
        [key: string]: string[];
      }
) => {
  if (typeof data === 'object') {
    return true;
  }
  return false;
};
