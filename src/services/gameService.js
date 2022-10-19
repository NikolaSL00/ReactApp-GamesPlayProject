import * as request from "./util/requester";

const baseUrl = 'http://localhost:3030/data/games';

export const getAll = () => request.get(
    `${baseUrl}`
);

export const getLatest = () => request.get(
    `${baseUrl}?sortBy=_createdOn%20desc&distinct=category`
);

export const getDetails = (gameId) => request.get(
    `${baseUrl}/${gameId}`
);

export const create = (gameData) => request.post(
    `${baseUrl}`, gameData
);

export const edit = (gameId, gameData) => request.put(
    `${baseUrl}/${gameId}`, gameData
);
