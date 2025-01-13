// allows typescript to infer non nullable
export default <T>(x: T): x is NonNullable<typeof x> => Boolean(x);
