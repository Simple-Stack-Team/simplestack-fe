export const fetchRejectProposal = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({confirm: true})
  });

  return res;
};
