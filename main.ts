import { createExpressEndpoints } from '@ts-rest/express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import * as Contracts from "@/contracts";
import * as Routers from "@/routers";
import { Auth } from '@/middleware';
import { generateOpenApi } from '@ts-rest/open-api';
import * as swaggerUi from 'swagger-ui-express';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createExpressEndpoints(Contracts.UserContract, Routers.UserRouter, app);

createExpressEndpoints(Contracts.PostContract, Routers.PostRouter, app, {
  globalMiddleware :[ Auth ],
});

const openApiDocument = generateOpenApi(Contracts.ApiContract, {
  info: {
    title: 'API',
    version: '1.0.0',
    
  },
});

openApiDocument.components = openApiDocument.components || {};
openApiDocument.components.securitySchemes = openApiDocument.components.securitySchemes || {};
openApiDocument.components.securitySchemes.auth = {
  type : 'apiKey',
  in : 'header',
  name : 'authorization' 
}
openApiDocument.security = openApiDocument.security || [];
openApiDocument.security.push({
  auth : []
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});