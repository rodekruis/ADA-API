import { ILike } from "typeorm";

function getWhereClause<T>(
    search: string,
    searchEntityFieldsNames: NonNullable<keyof T>[],
) {
    let whereClause;
    if (search) {
        whereClause = searchEntityFieldsNames.map(
            (fieldName: NonNullable<keyof T>) => {
                return { [fieldName]: ILike(`%${search}%`) };
            },
        );
    }
    return whereClause;
}

export default getWhereClause;
