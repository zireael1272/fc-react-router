const BASE_URL = "https://dummyjson.com";

async function request(url) {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}

export async function getUsers() {
  const data = await request("/users?limit=0");
  return data.users;
}

export async function getUserById(id) {
  return request(`/users/${id}`);
}

export async function getUserCarts(userId) {
  const data = await request(`/carts/user/${userId}`);
  return data.carts;
}
