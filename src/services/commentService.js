import * as request from "./util/requester";

const baseUrl = 'http://localhost:3030';

export const getAllComments = (gameId) => request.get(
    `${baseUrl}/data/comments?where=gameId%3D%22${gameId}%22`
);