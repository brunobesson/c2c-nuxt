export default function <T>(a1: T[], a2: T[]): boolean {
  return a1.some(a => a2.includes(a));
}
