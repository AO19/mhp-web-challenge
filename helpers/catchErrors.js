function catchErrors(fn) {
  return function(...args) {
    return fn(...args).catch(error => console.error(`Error: ${error}`));
  }
}

export default catchErrors;
