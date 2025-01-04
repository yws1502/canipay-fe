export type Range<N extends number, Result extends unknown[] = []> = Result['length'] extends N
  ? Result['length']
  : Result['length'] | Range<N, [unknown, ...Result]>;
