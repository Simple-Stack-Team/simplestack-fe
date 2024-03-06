async function getData<T>(url: string, options): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) null;

    return response.json();
  } catch (err) {}
}
