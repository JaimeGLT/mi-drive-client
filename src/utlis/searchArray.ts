// utils/searchArray.ts
export const searchArray = <T extends { name: string }>(
  array: T[],
  term: string
) => {
  if (!term) return array;
  return array.filter((item) =>
    item.name.toLowerCase().includes(term.toLowerCase())
  );
};
