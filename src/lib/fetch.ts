
export async function fetchWrapper<T = unknown>(endPoint: RequestInfo | URL, init?: RequestInit | undefined) {
  try {
    const data = await fetch(`http://localhost:3000/api/${endPoint}`, init)

    const result = await data.json();

    return result as T
  } catch (error) {
    console.log('error', error)
  }
}