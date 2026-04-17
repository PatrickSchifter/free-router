export const created = <T>({
  data,
  entityName,
}: {
  data: T;
  entityName: string;
}) => ({
  status: 201,
  success: true,
  message: `${entityName} created successfully`,
  data,
});

export const ok = <T>({ data }: { data: T }) => ({
  status: 200,
  success: true,
  data,
});

export const noContent = () => ({
  status: 204,
  success: true,
});

export const paginated = <T>({
  data,
  total,
  page,
  limit,
}: {
  data: T[];
  total: number;
  page: number;
  limit: number;
}) => ({
  status: 200,
  success: true,
  data,
  meta: { total, page, limit, lastPage: Math.ceil(total / limit) },
});
