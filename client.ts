import { initClient } from '@ts-rest/core';
import { PostContract, UserContract } from "@/contracts";

async function main(){
    const baseUrl = 'http://localhost:4000';
    const baseHeaders = {};
    
    const Users = initClient(UserContract, {
        baseUrl,
        baseHeaders
    });
    
    const Posts = initClient(PostContract, {
        baseUrl,
        baseHeaders
    });

    let registerUser = await Users.register({ body : {
        name : "Mahad",
        email : "mahad@gmail.com",
        password : "12345"
    }});
    let user : any;
    if(registerUser.status != 201 && registerUser.status != 400) throw registerUser;

    if(registerUser.status === 400){
        console.log(registerUser.body.message);
        /* User already existed so we must login instead. */
        const loggedInUser = await Users.login({ body : {
            email : "mahad@gmail.com",
            password : "12345"
        }});

        if(loggedInUser.status !== 200) throw loggedInUser;
        user = loggedInUser.body
    }
    else user = registerUser.body;

    console.log("User logged in:")
    console.log(user);

    const token = user.token;
    
    const post = await Posts.createPost({ 
        body : { title : "My First Post", content : "First post made through ts-rest client"},
        headers : {
            authorization : `BEARER ${token}`
        }
    });
    if(post.status != 201) throw post;

    console.log(`Post created by ${user.name}`);
    console.log(post.body);

    const postId = String(post.body.id);

    const samePost = await Posts.getPost({
        params : { id : postId },
        headers : {
            authorization : `BEARER ${token}`
        }
    });

    if(samePost.status != 200) throw samePost;
    console.log(`Post fetched by id = ${postId}`);
    console.log(samePost.body)
}

await main();