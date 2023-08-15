import { initContract } from '@ts-rest/core';
import PostContract from './Post.contract';
import UserContract from './User.contract';

const contract = initContract();
const ApiContract = contract.router({ posts : PostContract, user : UserContract}); 
export { PostContract, ApiContract, UserContract };

