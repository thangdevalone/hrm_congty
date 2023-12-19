import { QueryParam } from "@/models";

export const ConvertQueryParam = (param?: QueryParam): string => {
    if (!param) return "";
    const { pageSize, pageIndex, sort_by, asc, query } = param;

    // Tạo một đối tượng mới chỉ chứa các trường có giá trị
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queryParams: { [key: string]: any } = {};

    if (pageSize !== undefined) {
        queryParams.pageSize = pageSize;
    }

    if (pageIndex !== undefined) {
        queryParams.pageIndex = pageIndex;
    }

    if (sort_by !== undefined) {
        queryParams.sort_by = sort_by;
    }

    if (asc !== undefined) {
        queryParams.asc = asc;
    }

    if (query !== undefined) {
        queryParams.query = query;
    }

    // Tạo chuỗi truy vấn từ đối tượng queryParams
    const queryString = Object.keys(queryParams)
        .map((key) => `${key}=${queryParams[key]}`)
        .join("&");

    return queryString ? `?${queryString}` : "";
};
