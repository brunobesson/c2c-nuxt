import type { DocumentType, LetterType } from '~/api/c2c.js';

export default function (letter: DocumentType): LetterType {
  switch (letter) {
    case 'area':
      return 'a';
    case 'book':
      return 'b';
    case 'article':
      return 'c';
    case 'image':
      return 'i';
    case 'map':
      return 'm';
    case 'outing':
      return 'o';
    case 'route':
      return 'r';
    case 'profile':
      return 'u';
    case 'waypoint':
      return 'w';
    case 'xreport':
      return 'x';
  }
}
