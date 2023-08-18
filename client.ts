import { initClient } from '@ts-rest/core';
import { PostContract, UserContract } from "@/contracts";

async function main(){
    const baseUrl = 'http://localhost:4000';
    const baseHeaders = {};
    
    const Users = initClient(UserContract, {
        baseUrl,
        baseHeaders
    });

    const name = "Jane";
    const email = "Jane@doe.com";
    const password = "123456789";

    const res = await Users.register({ body : { name, email, password }});

    // let user : any;
    if(res.status != 201 && res.status != 400) throw res;

    /* The user has either been created now, or they already exist */
    const user = await Users.login({ body : { email, password }});

    if(user.status !== 200) throw user;

    const token = user.body.token;
    
    const Posts = initClient(PostContract, {
        baseUrl,
        baseHeaders : {
            authorization : `BEARER ${token}`
        }
    });

    const post = await Posts.createPost({ 
        body : { 
            title : "My First Post",
            content : "First post made through ts-rest client"
        },
    });

    if(post.status != 201) throw post;

    console.log(`Post created by ${user.body.name}`);
    console.log(post.body);

    const postId = String(post.body.id);

    const samePost = await Posts.getPost({
        params : { id : postId },
    });

    if(samePost.status != 200) throw samePost;
    console.log(`Post fetched by id = ${postId}`);
    console.log(samePost.body)
}

await main();