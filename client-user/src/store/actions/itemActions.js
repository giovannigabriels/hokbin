import {
  MENU_ITEM_FETCH,
  ONE_ITEM_FETCH,
  RECOMEND_ITEM_FETCH,
} from "./actionTypes";

const urlBase = "https://hokbin-production.up.railway.app";

export const recomendItemFetch = (payload) => {
  return {
    type: RECOMEND_ITEM_FETCH,
    payload,
  };
};

export const menuItemFetch = (payload) => {
  return {
    type: MENU_ITEM_FETCH,
    payload,
  };
};

export const oneItemFetch = (payload) => {
  return {
    type: ONE_ITEM_FETCH,
    payload,
  };
};

export const fetchRecomendItem = () => {
  return (dispatch, getState) => {
   return fetch(`${urlBase}/pub/items?recommend=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(recomendItemFetch(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const fetchMenuItem = () => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/pub/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(menuItemFetch(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const fetchOneItem = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/pub/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };
};
