import * as request from "./util/requester";

const baseUrl = 'http://localhost:3030/data/comments';

export const getAllPopulatedWithAuthor = (gameId) => {
    const relations = encodeURIComponent(`user=_ownerId:users`);
    const search = encodeURIComponent(`gameId="${gameId}"`);
    
    return request.get(
        `${baseUrl}?where=${search}&load=${relations}`
    );
}

export const create = (commentData) => request.post(
    `${baseUrl}`, commentData
);
