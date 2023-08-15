import { PostSchema } from '@/prisma';
import { initContract } from '@ts-rest/core';
import {  z } from 'zod';

const contract = initContract();

const PostContract = contract.router({ 
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: PostSchema.pick({ 
        title : true,
        content : true,
    }),
    summary: 'Create a post',
  },
  getPost: {
    method: 'GET',
    path: `/posts/:id`,
    pathParams : z.object({ id : z.string().transform(Number) }),
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Get a post by id',
  },
}, {
    strictStatusCodes : true,
    baseHeaders : z.object({
        authorization : z.string()
    })
});

export default PostContract;