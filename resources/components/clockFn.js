//Returns 0 in front of single digit numbers
export function zeroPad(number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}


//Returns hour from user's preferred format
export function getHour(displayFormat, hours) {
  return displayFormat === "12h" ? (hours % 12 || 12) : hours;
}
