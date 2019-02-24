export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function calcRemainingProgress(progress, goal) {
  progress = progress || 0;
  goal = goal || 0;
  return 1 - Math.min(progress / goal, 1);
}

export function calcXTranslation(remainingProgress) {
  return 144 * remainingProgress / 2;
}

export function calcYTranslation(remainingProgress) {
  return 144 * remainingProgress / 2;
}