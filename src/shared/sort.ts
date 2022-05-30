const defaultSort: string = "id";

enum SortOrder {
    "+" = "ASC",
    "-" = "DESC",
    "" = "ASC",
}

type SortPrefix = keyof typeof SortOrder;

function getOrderClause<T>(
    sort: string,
    sortEntityFieldsNames: NonNullable<keyof T>[],
) {
    let sortPrefix = "" as SortPrefix;
    let sortField = sort;

    if (sort && sort.charAt(0) in SortOrder) {
        sortPrefix = sort.charAt(0) as SortPrefix;
        sortField = sort.substring(1);
    }

    const sortOrder = SortOrder[sortPrefix];
    const isValidSortField = sortEntityFieldsNames.includes(
        sortField as NonNullable<keyof T>,
    );
    sortField = isValidSortField ? sortField : defaultSort;

    return { [sortField]: sortOrder };
}

function getSortEntityFieldNames(entityFieldNames: string[]) {
    const descEntityFieldNames = entityFieldNames.map(
        (fieldName: string) => `${"-" as SortPrefix}${fieldName}`,
    );
    return [...entityFieldNames, ...descEntityFieldNames];
}

export default defaultSort;

export { getOrderClause, getSortEntityFieldNames };
