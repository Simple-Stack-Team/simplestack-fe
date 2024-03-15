export const fetchAcceptProposal = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({confirm: true})
  });

  return res;
};
