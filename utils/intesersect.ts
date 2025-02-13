export const intersect = <T>(a1: T[], a2: T[]): boolean => a1.some(a => a2.includes(a));
