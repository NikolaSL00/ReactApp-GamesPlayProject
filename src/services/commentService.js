import * as request from "./util/requester";

const baseUrl = 'http://localhost:3030';

export const getAll = (gameId) => request.get(
    `${baseUrl}/data/comments?where=gameId%3D%22${gameId}%22`
);

export const create = (commentData) => request.post(
    `${baseUrl}/data/comments`, commentData
);
