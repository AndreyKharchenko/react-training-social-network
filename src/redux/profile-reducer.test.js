import profileRuducer, { addPostActionCreator, deletePost } from "./profile-reducer";
import React from "react";


let state = {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11},
      {id: 3, message: 'Blabla', likesCount: 11},
      {id: 4, message: 'Dada', likesCount: 11}
    ]
};

test('length of posts should be incremented', () => {
    // 1. test data
    let action  = addPostActionCreator("it-brain");
    
    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {
    // 1. test data
    let action  = addPostActionCreator("it-brain");
 
    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect(newState.posts[4].message).toBe("it-brain");
});

test('after deleting length of posts should be decrement', () => {
    // 1. test data
    let action  = deletePost(1);
 
    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});

test(`after deleting length should't be decrement if id is incorrect`, () => {
    // 1. test data
    let action  = deletePost(1000);
 
    // 2. action
    let newState = profileRuducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});
