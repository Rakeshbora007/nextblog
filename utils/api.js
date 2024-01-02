export const fetchData = async (category = "") => {
  const res = await fetch(`http://localhost:3000/api/posts?cat=${category}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
