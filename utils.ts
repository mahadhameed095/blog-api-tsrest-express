import crypto from 'crypto';
export const encrypt = (text : string) => crypto.createHash('sha256').update(text).digest('hex');
import { generateOpenApi } from '@ts-rest/open-api';

export function patchOpenAPIDocument(openApiDocument : ReturnType<typeof generateOpenApi>){
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
    
    Object.entries(openApiDocument.paths).map(([endpoint, methods]) => {
      Object.entries(methods).map(([method, implementation] : [method : any, implementation : any]) => {
        implementation.parameters = implementation.parameters.filter((obj : any) => !(obj.name === "authorization" && obj.in === "header"))
      });
    });
}