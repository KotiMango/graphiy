export const simpleStrToISO = (baseStr) => {
  const dateIso = new Date(baseStr).toISOString();
  return dateIso;
};
