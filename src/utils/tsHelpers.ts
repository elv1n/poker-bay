export type Unionize<T extends object> = {
  [P in keyof T]: { [Q in P]: T[P] };
}[keyof T];

export type MapToTagContents<T extends Record<any, any>> = T extends object
  ? T[keyof T] extends undefined
    ? { tag: keyof T }
    : { tag: keyof T; contents: T[keyof T] }
  : never;

export type UnionizeToTagContents<T extends object> = {
  [P in keyof T]?: T[P] extends undefined
    ? { tag: P }
    : { tag: P; contents: T[P] };
};
