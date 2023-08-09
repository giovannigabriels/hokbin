import { CATEGORY_FETCH, INPUT_ITEM, ITEM_FETCH } from "./actionTypes";
const urlBase = "https://hokbin-production.up.railway.app";
export const fetchItem = (payload) => {
  return {
    type: ITEM_FETCH,
    payload,
  };
};

export const inputItemFetch = (payload) => {
  return {
    type: INPUT_ITEM,
    payload,
  };
};

export const fetchDataItem = () => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/items`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchItem(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const addItem = (payload) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/items`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchDataItem());
        return data;
      });
  };
};

export const deleteItem = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/items/${id}`, {
      method: "delete",
      headers: {
        access_token: localStorage.access_token,
      },
    })
  };
};

export const findOneItem = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/items/${id}`, {
      headers: {
        access_token: localStorage.access_token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(inputItemFetch(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const putItem = (payload, id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/items/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(payload),
    }).then((response) => {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    });
  };
};
