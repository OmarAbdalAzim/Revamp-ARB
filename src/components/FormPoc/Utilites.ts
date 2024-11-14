type ActionValueGenerator = (key: string) => any;

export const extractValue = (
  keys: string[],
  generator?: ActionValueGenerator
): Record<string, any> => {
  const initialState: Record<string, any> = {};

  keys.forEach((key) => {
    initialState[key] = generator ? generator(key) : null;
  });

  return initialState;
};
