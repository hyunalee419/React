export const fetchData = async () => {
  try {
    const response = await fetch("https://randomuser.me/api");
    return await response.json();
  } catch (e) {
    console.log(e);
  }
};
