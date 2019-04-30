import axios from "axios";
import {
  GET_TABLES,
  CLOSE_TABLE,
  START_NEW_CHECK,
  ADD_MENU_ITEM,
  CLOSE_CHECK,
  OPEN_TABLE,
  VOID_ITEM,
  GET_SERVER_CHECKS
} from "./types";
import { BASE_URL, requestConfig } from "../config";
import { getTableNumber } from "./util";

const getTables = () => async dispatch => {
  try {
    const { data } = await axios.get(`${BASE_URL}/tables`, requestConfig);

    return dispatch({
      type: GET_TABLES,
      data
    });
  } catch (error) {
    console.error("get tables error", error);
  }
};

const startNewCheck = table => async dispatch => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/checks`,
      { tableId: table.id },
      requestConfig
    );

    dispatch({
      type: CLOSE_TABLE,
      table
    });

    return dispatch({
      type: START_NEW_CHECK,
      data
    });
  } catch (error) {
    console.error("startNewCheck error", error);
  }
};

const addMenuItem = (item, tableId) => async (dispatch, getState) => {
  // TODO: Make a function that finds checks by tableId, using this code twice:
  const { checks, tables } = getState();

  const { openChecks } = checks;
  const { closedTables } = tables;

  const currentTable = await closedTables.find(table => table.id === tableId);

  const tableNumber = currentTable.number;
  const currentCheck = await openChecks.find(
    check => check.tableId === tableId
  );
  const checkId = currentCheck.id;
  const itemId = item.id;
  // Find Index of current check
  try {
    const response = await axios.put(
      `${BASE_URL}/checks/${checkId}/addItem`,
      { itemId },
      requestConfig
    );

    const checkUpdates = response.data;

    const newItem = {
      ...item,
      orderedItemId: checkUpdates.id
    };

    return dispatch({
      type: ADD_MENU_ITEM,
      checkId,
      checkUpdates,
      newItem,
      tableNumber
    });
  } catch (error) {
    console.error("addMenuItem", error);
  }
};

const closeCheck = table => async (dispatch, getState) => {
  const { checks } = await getState();

  const { openChecks } = checks;
  const currentTableId = table.id;
  const currentCheck = await openChecks.find(
    check => check.tableId === currentTableId
  );

  const checkId = currentCheck.id;
  const response = await axios.put(
    `${BASE_URL}/checks/${checkId}/close`,
    {},
    requestConfig
  );
  const checkResponse = response.data;

  const closedCheck = {
    ...checkResponse,
    orderedItems: currentCheck.orderedItems,
    tableNumber: currentCheck.tableNumber
  };

  dispatch({
    type: OPEN_TABLE,
    table
  });

  return dispatch({
    type: CLOSE_CHECK,
    checkId,
    closedCheck
  });
};

const voidItem = (item, checkId, index) => async dispatch => {
  const { orderedItemId } = item;
  try {
    const response = await axios.put(
      `${BASE_URL}/checks/${checkId}/voidItem`,
      { orderedItemId },
      requestConfig
    );
    const checkUpdates = response.data;
    console.log("checkUpdates", checkUpdates);
    // TODO: VOID ITEM is removing every item w/ same name
    return dispatch({
      type: VOID_ITEM,
      checkId,
      checkUpdates,
      index
    });
  } catch (error) {
    console.error("voidItem action error", error);
  }
};

const getServerChecks = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/checks`, requestConfig);
    const openChecksFromServer = data.filter(check => !check.closed);
    const closedChecksFromServer = data.filter(check => check.closed);

    const { tables } = getState();
    const { allTables } = tables;

    // const currentTable = await closedTables.find(table => table.id === tableId);
    const openChecks = openChecksFromServer.map(openCheck => {
      return {
        ...openCheck,
        tableNumber: getTableNumber(allTables, openCheck.tableId)
      };
    });

    const closedChecks = closedChecksFromServer.map(closedCheck => {
      return {
        ...closedCheck,
        tableNumber: getTableNumber(allTables, closedCheck.tableId)
      };
    });

    return dispatch({
      type: GET_SERVER_CHECKS,
      openChecks,
      closedChecks
    });
  } catch (error) {
    console.error("getServerChecks redux error", error);
  }
};

export {
  getTables,
  startNewCheck,
  addMenuItem,
  closeCheck,
  voidItem,
  getServerChecks
};
