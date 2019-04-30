// Util function: use to find table number from a check
const getTableNumber = (tableArr, checksTableId) => {
  const currentTable = tableArr.find(table => table.id === checksTableId);

  return currentTable.number;
};

export { getTableNumber };
