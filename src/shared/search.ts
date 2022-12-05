import { ILike } from "typeorm";

function getWhereClause<T>(
    search: string,
    searchEntityFieldsNames: NonNullable<keyof T>[],
) {
    if (search) {
        return searchEntityFieldsNames.map(
            (fieldName: NonNullable<keyof T>) => {
                return { [fieldName]: ILike(`%${search}%`) };
            },
        );
    }
}

export default getWhereClause;
