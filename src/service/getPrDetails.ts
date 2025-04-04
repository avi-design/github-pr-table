import { PullRequest } from "../types/types";

export const getAllPRsDetails = (): Promise<[PullRequest] | Error> => {
  const owner = "divvydose";
  const repo = "ui-coding-challenge";

  return fetch(`https://api.github.com/repos/${owner}/${repo}/pulls`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err: Error) => {
      console.error(err.message);
      return Promise.resolve(err);
    });
};


export const getPRSummary = (prURL:string) =>{

  return fetch(prURL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((err: Error) => {
      console.error(err.message);
      return Promise.resolve(err);
    });
}