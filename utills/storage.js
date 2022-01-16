//check storage for data
export const checkStorage = () => {
  const localData = localStorage.getItem("favorites");
  return localData ? JSON.parse(localData) : [];
};
