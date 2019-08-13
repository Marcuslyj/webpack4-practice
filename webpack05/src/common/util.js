exports.loadjs = async function (filePath, globalName) {
  if (!window[globalName]) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = filePath;
      script.onload = () => {
        resolve(window[globalName]);
      };
      document.querySelector('body').appendChild(script);
    });
  }
  return new Promise((resolve) => {
    resolve(window[globalName]);
  });
};
