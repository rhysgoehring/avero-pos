import axios from "axios";
import { GET_TABLES, GET_ITEMS } from "./types";

const requestConfig = {
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhNGFlMmM0LTZlNWMtNDhlMy04ZDRlLTFkNzhjNWE3MDZhZiIsIm5hbWUiOiJSaHlzIn0.FCcG29CTjqCaWxQfpymhyuS0pv8krDQu15fKAQRjVFo"
  }
};

const getTables = () => async dispatch => {
  try {
    const { data } = await axios.get(
      "https://check-api.herokuapp.com/tables",
      requestConfig
    );
    console.log("get tables data: ", data);
    return dispatch({
      type: GET_TABLES,
      data
    });
  } catch (error) {
    console.log("get tables error", error);
  }
};

export { getTables };
