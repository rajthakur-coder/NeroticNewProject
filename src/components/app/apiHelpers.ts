// src/utils/createCrudEndpoints.ts
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

export function createCrudEndpoints<
  T,        // Resource type
  ID = string // ID type, default string
>(
  builder: EndpointBuilder<any, any, any>, // RTK Query builder
  resource: string
) {
  return {
    getAll: builder.query<T[], void>({
      query: () => `/${resource}`,
      providesTags: [resource],
    }),
    getById: builder.query<T, ID>({
      query: (id: ID) => `/${resource}/${id}`,
      providesTags: [resource],
    }),
    create: builder.mutation<T, Partial<T>>({
      query: (data: Partial<T>) => ({
        url: `/${resource}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [resource],
    }),
    update: builder.mutation<T, { id: ID } & Partial<T>>({
      query: ({ id, ...data }) => ({
        url: `/${resource}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [resource],
    }),
    delete: builder.mutation<{ success: boolean }, ID>({
      query: (id: ID) => ({
        url: `/${resource}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [resource],
    }),
  };
}
