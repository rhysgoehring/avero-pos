// Find table number from a check:
const getTableNumber = (tableArr, checksTableId) => {
  const currentTable = tableArr.find(table => table.id === checksTableId);

  return currentTable.number;
};

// Round numbers to 2 decimal places
const roundNumber = (value, decimals) => {
  const roundedNumber = Number(
    `${Math.round(`${value}e${decimals}`)}e-${decimals}`
  );
  return roundedNumber;
};

export { getTableNumber, roundNumber };
