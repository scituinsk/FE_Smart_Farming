import { QueryClient, type UseMutationOptions } from "@tanstack/react-query";

export const queryClient = new QueryClient();

/**
 * Utility Type: Mendapatkan tipe data yang dikembalikan oleh Promise dari fungsi asynchronous.
 *
 * @typedef {Awaited<ReturnType<FnType>>} ApiFnReturnType
 * @template FnType - Tipe fungsi async (misalnya, fungsi fetcher API).
 */
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>;

/**
 * Utility Type: Tipe konfigurasi untuk opsi `useQuery`, mengecualikan `queryKey` dan `queryFn`
 * karena properti ini sudah didefinisikan dalam fungsi `queryOptions`.
 *
 * @typedef {Omit<ReturnType<T>, "queryKey" | "queryFn">} QueryConfig
 * @template T - Tipe fungsi yang mengembalikan objek `queryOptions`.
 */
export type QueryConfig<T extends (...args: any[]) => any> = Omit<ReturnType<T>, "queryKey" | "queryFn">;

/**
 * Utility Type: Tipe konfigurasi untuk opsi `useMutation`,
 * menyesuaikan tipe `UseMutationOptions` TanStack Query agar sesuai dengan
 * tipe pengembalian (success data), error, dan parameter (payload) dari fungsi mutasi API (`MutationFnType`).
 *
 * @typedef {UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>} MutationConfig
 * @template MutationFnType - Tipe fungsi mutasi async (misalnya, fungsi post/put API).
 */
export type MutationConfig<MutationFnType extends (...args: any) => Promise<any>> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
