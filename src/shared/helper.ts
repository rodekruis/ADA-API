export const pick = <T, K extends keyof T>(
    obj: T,
    ...keys: K[]
): Pick<T, K> => {
    const copy = {} as Pick<T, K>;
    keys.forEach((key) => {
        if (obj[key] !== undefined) {
            copy[key] = obj[key];
        }
    });
    return copy;
};

export default { pick };
