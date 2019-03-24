export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function formatDateAsString(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function find(list, predicate) {
  for (const item of list) {
      if (predicate(item)) {
          return item;
      }
  }

  return undefined;
}