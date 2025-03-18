import type { LetterType } from '~/api/c2c.js';

export default function (letter: LetterType) {
  switch (letter) {
    case 'a':
      return 'area';
    case 'b':
      return 'book';
    case 'c':
      return 'article';
    case 'i':
      return 'image';
    case 'm':
      return 'map';
    case 'o':
      return 'outing';
    case 'r':
      return 'route';
    case 'u':
      return 'profile';
    case 'w':
      return 'waypoint';
    case 'x':
      return 'xreport';
  }
}
