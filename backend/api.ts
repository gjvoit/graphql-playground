// The root provides a resolver function for each API endpoint
const hello = () => {
  return 'Hello world!';
}

const endpoint2 = () => {};

export default {
  hello,
  endpoint2,
};
