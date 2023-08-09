import { CATEGORY_FETCH, INPUT_CATEGORY } from "./actionTypes";
const urlBase = "https://hokbin-production.up.railway.app";
export const fetchCategory = (payload) => {
  return {
    type: CATEGORY_FETCH,
    payload,
  };
};

export const inputCategoryFetch = (payload) => {
  return {
    type: INPUT_CATEGORY,
    payload,
  };
};

export const fetchDataCategory = () => {
  return (dispatch, getState) => {
    fetch(`${urlBase}/categories`, {
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
        dispatch(fetchCategory(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const addCategory = (input) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/categories`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.access_token,
      },
      body: JSON.stringify(input),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then((data) => {
        dispatch(fetchDataCategory());
        return data;
      });
  };
};

export const deleteCategory = (id) => {
  return (dispatch, getState) => {
   return fetch(`${urlBase}/categories/${id}`, {
      method: "delete",
      headers: {
        access_token: localStorage.access_token,
      },
    })
  };
};

export const findOneCategory = (id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/categories/${id}`, {
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
        dispatch(inputCategoryFetch(data));
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
};

export const putCategory = (payload, id) => {
  return (dispatch, getState) => {
    return fetch(`${urlBase}/categories/${id}`, {
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
