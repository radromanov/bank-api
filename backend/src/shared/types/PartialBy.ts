/**
 * https://stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
 *
 * Can omit mulitple props as well:
 * e.g. PartialBy<Person, 'nickname'|'hometown'>
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
