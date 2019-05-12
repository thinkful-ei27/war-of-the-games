/* eslint-disable no-undef */

export const loadAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const saveAuthToken = authToken => {
  try {
    localStorage.setItem("authToken", authToken);
  } catch (e) {
    console.error(e);
  }
};

export const clearAuthToken = () => {
  try {
    localStorage.removeItem("authToken");
  } catch (e) {
    console.error(e);
  }
};

export const loadVoteCount = () => {
  return localStorage.getItem("voteCount");
};

export const clearVoteCount = () => {
  try {
    localStorage.removeItem("voteCount");
  } catch (e) {
    console.error(e);
  }
};

export const saveVoteCount = count => {
  try {
    localStorage.setItem("voteCount", count);
  } catch (e) {
    console.error(e);
  }
};

export const incrementVoteCount = count => {
  return saveVoteCount(count + 1);
};

export const checkVoteCount = () => {
  let count = Number(loadVoteCount());
  if (count === 0 || Number.isNaN(count)) {
    count = 1;
  } else if (count > 13) {
    count = 13;
  }
  saveVoteCount(count);
  return count;
};
