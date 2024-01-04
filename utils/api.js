const api = process.env.NEXT_PUBLIC_API_URL

export const fetchData = async (category = '') => {
  const res = await fetch(`${api}/api/posts?cat=${category}`, {
    cache: 'no-store'
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
