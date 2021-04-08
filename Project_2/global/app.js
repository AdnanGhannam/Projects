async function get(url) {
  const resp = await fetch(url);
  const data = await resp.json();
  return data;
}
// const data = get("https://api.spoonacular.com/recipes/716429/information?apiKey=8f1e74b58b4a45bd8765fafb9337a781");
//
// data.then(r => {
//   console.log(r);
// });
