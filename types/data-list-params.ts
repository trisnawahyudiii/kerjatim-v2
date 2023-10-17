export type DataListParams = Partial<{
  page: number;
  size: number;
  sortBy: string;
  direction: "ASC" | "DESC";
  search: string;
  searchBy: string;
}>;
