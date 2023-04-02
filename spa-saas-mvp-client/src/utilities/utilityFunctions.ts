import * as T from '../utilities/types';

export function durationToSeconds(duration: T.Duration): number {

  let sumSeconds = 0;

  if (duration.minutes !== null) {
    sumSeconds += duration.minutes * 60;
  }

  if (duration.hours !== null) {
    sumSeconds += duration.hours * 3600;
  }

  return sumSeconds;
}

export function secondsToDuration(seconds: number): T.Duration {

  const hours = Math.floor(seconds / 3600);

  let remainingSeconds = seconds - hours * 3600;

  const minutes = Math.floor(remainingSeconds / 60);

  remainingSeconds = remainingSeconds - minutes * 60;

  if (remainingSeconds !== 0) {
    throw new Error("Seconds are not in multiples of 60");
  }

  const duration = {
    hours,
    minutes,
    seconds: remainingSeconds,
  }

  return duration;
}

export function addSpaceBeforeCapitalLetters(s: string): string {
  return s.replace(/([A-Z])/g, ' $1').trim();
}