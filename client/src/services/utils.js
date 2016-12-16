export const handleError = (res) => {
  if (res.status >= 400) {
    return res.text().then((text) => {
      throw new Error(text);
    });
  }

  return res;
};

export const toJSON = res => res.json();
