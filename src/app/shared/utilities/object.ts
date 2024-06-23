export function removeUndefinedProperties<
  T extends { [s: string]: unknown } | ArrayLike<unknown>
>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  ) as T;
}
