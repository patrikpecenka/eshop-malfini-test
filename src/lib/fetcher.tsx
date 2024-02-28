export default async function fetcher<T>(...args: Parameters<typeof fetch>): Promise<T> {
  const res = await fetch(...args);
  return await res.json();
}