import { ILike } from "typeorm";
import { EntityFieldsNames } from "typeorm/common/EntityFieldsNames";

function getWhereClause<T>(
    search: string,
    searchEntityFieldsNames: NonNullable<EntityFieldsNames<T>>[],
) {
    return search
        ? searchEntityFieldsNames.map(
              (fieldName: NonNullable<EntityFieldsNames<T>>) => {
                  return {
                      [fieldName]: ILike(`%${search}%`),
                  };
              },
          )
        : [];
}

export default getWhereClause;
