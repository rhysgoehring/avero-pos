import axios from "axios";
import {
  GET_TABLES,
  CLOSE_TABLE,
  START_NEW_CHECK,
  ADD_MENU_ITEM,
  CLOSE_CHECK,
  OPEN_TABLE,
  VOID_ITEM
} from "./types";
import { BASE_URL, requestConfig } from "../config";

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
  const { checks } = getState();
  const { openChecks } = checks;
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
      newItem
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
    orderedItems: currentCheck.orderedItems
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

const voidItem = (item, checkId) => async (dispatch, getState) => {
  // console.log("voidItem item:", item);
  // console.log("voidItem checkId", checkId);
  const { orderedItemId } = item;
  // const { checks } = getState();
  // const currentCheck = await checks.openChecks.find(
  //   check => check.id === checkId
  // );
  try {
    const response = await axios.put(
      `${BASE_URL}/checks/${checkId}/voidItem`,
      { orderedItemId },
      requestConfig
    );
    const checkUpdates = response.data;
    console.log("checkUpdates", checkUpdates);

    dispatch({
      type: VOID_ITEM,
      checkId,
      checkUpdates
    });
  } catch (error) {
    console.error("voidItem action error", error);
  }
};

export { getTables, startNewCheck, addMenuItem, closeCheck, voidItem };
