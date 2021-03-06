import { Primitive } from "./primitive";

type ImmutableObject<T> = { readonly [P in keyof T]: Immutable<T[P]> };

interface ImmutableMap<T, U> extends ReadonlyMap<Immutable<T>, Immutable<U>> {}

interface ImmutableSet<T> extends ReadonlySet<Immutable<T>> {}

export type Immutable<T> = T extends Primitive | Function
  ? T
  : T extends Array<infer U>
  ? T
  : T extends Map<infer U, infer V>
  ? ImmutableMap<U, V>
  : T extends Set<infer U>
  ? ImmutableSet<U>
  : ImmutableObject<T>;
