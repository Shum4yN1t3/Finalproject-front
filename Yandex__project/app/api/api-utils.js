const normalizeDataObject = (obj) => {
  let str = JSON.stringify(obj);

  str = str.replaceAll("_id", "id");
  const newObj = JSON.parse(str);
  const result = { ...newObj, category: newObj.categories };
  return result;
};

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item);
  });
};

export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
  const data = await getData(`${url}?categories.name=${category}`);
  return isResponseOk(data) ? normalizeData(data) : data;
};

export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const resData = await response.json();
    if (response.status !== 200) {
      throw new Error(resData.data[0].messages[0].id);
    }
    return resData;
  } catch (error) {
    return error;
  }
};

export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};

export function setJWT(jwt) {
  localStorage.setItem("jwt", jwt);
}
export function getJWT() {
  return localStorage.getItem("jwt");
}
export function removeJWT() {
  localStorage.removeItem("jwt");
}

export const checkIfUserVoted = (game, userId) => {
  return game.users.find((user) => user.id === userId);
};

export const vote = async (url, jwt, usersArray) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: usersArray }),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка голосования");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};
