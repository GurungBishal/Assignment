export interface Locals extends Record<string, any> {
  requestedResource: Document;
}

export as namespace Express;
export = Express;

declare namespace Express {
  interface Request {
    pagination: Record<'pageSize' | 'pageNumber', number>;
  }

  interface Response {
    typedLocals: Partial<Locals>;
  }
}
