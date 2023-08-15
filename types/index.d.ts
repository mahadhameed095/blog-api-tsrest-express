declare global {
    namespace Express {
        export interface Request {
            userId: number;
        }
    }

  namespace NodeJS {
    interface ProcessEnv {
        ACCESS_TOKEN_SECRET : string;
        PORT: number;
      // Add more environment variables as needed
    }
  }

}

export {};