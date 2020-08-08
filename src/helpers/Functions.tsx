export function divide(first: number, second: number) {
  return first / second;
}

export function add(first: number, second: number) {
  return first + second;
}

export function multiply(first: number, second: number) {
  return first * second;
}

export function subtract(first: number, second: number) {
  return first - second;
}

export function modulus(first: number, second: number) {
  return first % second;
}

export function getDate(createdOn: any) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day = new Date(createdOn).getDate();
  let month = months[new Date(createdOn).getMonth()];
  let year = new Date(createdOn).getFullYear();
  return `${day}, ${month} ${year}`;
}

const Functions = {
  divide,
  add,
  multiply,
  modulus,
  subtract,
  getDate
};

export default Functions;