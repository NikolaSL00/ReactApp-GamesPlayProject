import * as request from "./util/requester";

const baseUrl = 'http://localhost:3030';

export const getAll = () => request.get(
    `${baseUrl}/data/games`
);

export const getLatestGames = () => request.get(
    `${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`
);

export const getGameDetails = (gameId) => request.get(
    `${baseUrl}/data/games/${gameId}`
);

export const getAllComments = (gameId) => request.get(
    `${baseUrl}/data/comments?where=gameId%3D%22${gameId}%22`
);
