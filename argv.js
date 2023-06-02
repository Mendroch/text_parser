const args = process.argv.slice(2);

const argv = (arg) => {
  let index = args.indexOf('--' + arg);
  if (index !== -1 && args[index + 1] !== undefined) {
    return args[index + 1];
  } else {
    return null;
  }
};

module.exports = {
  get: argv,
};
