import { initServer } from "@ts-rest/express";
import { PostContract } from "@/contracts";
import { prisma } from "@/prisma";

const s = initServer();

const PostRouter = s.router(PostContract, {
    getPost : async ({ params : { id } }) => {
        const post = await prisma.post.findUnique({ where: { id } });
        return {
            status : 200,
            body : post ?? null
        }
    },
    createPost : async ({ body : { title, content }, req : { userId } }) => {
        /* author is the person who makes the call to begin with */
        const post = await prisma.post.create({  data : { title, content, authorId : userId } });
        return {
            status : 201,
            body : post
        }
    }
});

export default PostRouter;