'use strict';


export const LOADED_CONFIG = 'LOADED_CONFIG';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const REFRESH_SUBREDDIT = 'REFRESH_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
