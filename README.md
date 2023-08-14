# blog-api-tsrest-express
[![ts-rest logo](https://github.com/Thanatos095/blog-api-tsrest-express/assets/87665048/0d7c329b-7b21-4200-88e1-0a2c415c27db)](https://github.com/ts-rest/ts-rest)

## Introducing ts-rest: Your Type-Safe API Companion
Meet ts-rest, the dynamic newcomer that's revolutionizing API development. Imagine a library that effortlessly infuses your APIs with incremental type-safety, eliminating headaches and bolstering stability. ts-rest allows you to define "contracts," essentially schemas for your endpoints and routers. These contracts not only grant you potent type safety but also wield the might of Zod for data validation. What sets ts-rest apart is its adaptability—it refrains from making assumptions about your stack, seamlessly integrating into your existing projects. Moreover, the contract objects can even be employed on the client side, if you choose the monorepo route, enabling an experience akin to trpc.

Read the documentation here : https://ts-rest.com/docs/intro

## Embarking on the Project: Crafting a simple Blog API
Welcome to this compelling venture—an opportunity to test-drive the capabilities of ts-rest with the elegantly integrated ts-rest/express module. In this project, we will construct a potent yet streamlined blog API. Our creation will encompass essential features like basic authentication middleware and an enticing Swagger UI.

## Project Setup in Motion
Go ahead and setup the project through the following steps:

```console
npm run setup
```

This will install all the dependencies, create a prisma sqlite file, and also generate the prisma client, and zod schemas.

```console
npm start
```
