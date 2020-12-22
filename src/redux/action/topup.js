import axios from "axios";
import {
  TOPUP,
  CHARGE_TOPUP_1,
  CHARGE_TOPUP_2,
  CHARGE_TOPUP_3,
} from "../type/topup";
import { URI } from "../../utils";

export const topup = (token) => async (dispatch) => {
  const res = await axios.get(`${URI}/topup`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({ type: TOPUP, payload: res.data });
};

export const chargeTopup20k = (token) => async (dispatch) => {
  const res = await axios.post(
    `${URI}/topup/charge`,
    { amount: 20000 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({ type: CHARGE_TOPUP_1, payload: res.data.data });
};

export const chargeTopup50k = (token) => async (dispatch) => {
  const res = await axios.post(
    `${URI}/topup/charge`,
    { amount: 50000 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({ type: CHARGE_TOPUP_2, payload: res.data.data });
};

export const chargeTopup100k = (token) => async (dispatch) => {
  const res = await axios.post(
    `${URI}/topup/charge`,
    { amount: 100000 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({ type: CHARGE_TOPUP_3, payload: res.data.data });
};
