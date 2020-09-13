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
  let day: any = new Date(createdOn).getDate();
  day = day < 10 ? '0' + day : day;
  let month = months[new Date(createdOn).getMonth()];
  let year = new Date(createdOn).getFullYear();
  return `${day}, ${month} ${year}`;
}

export function getDateTime(createdOn: any) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let day: any = new Date(createdOn).getDate();
  day = day < 10 ? '0' + day : day;
  let month = months[new Date(createdOn).getMonth()];
  let year = new Date(createdOn).getFullYear();

  let hours = new Date(createdOn).getHours();
  let minutes: any = new Date(createdOn).getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;

  return `${day}, ${month} ${year} ${strTime}`;
}

const Functions = {
  divide,
  add,
  multiply,
  modulus,
  subtract,
  getDate,
  getDateTime
};

export default Functions;