export const getKeys = <T extends {}>(o: T): Array<keyof T> =>
  Object.keys(o) as Array<keyof T>;

export function assign<B, E>(base: B & E, extension: E): B & E {
  return Object.assign(base, extension);
}
