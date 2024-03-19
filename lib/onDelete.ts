export const onDelete = async (url: string, token: string, data: string): Promise<any> => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      id: data,
    }),
  });

  if (!res.ok) {
    throw new Error(`Request failed with status: ${res.status}`);
  }

  return res;
};
