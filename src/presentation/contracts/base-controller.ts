export interface HttpResponse<T = any> {
  status: number;
  data: T;
}
export interface IRequest<Body = any, Params = any> {
  body: Body;
  file: any;
  params: Params;
  query: any;
  headers: any;
  url: string;
  auth?: string;
}

export abstract class BaseController<T = any> {
  protected abstract executeImpl(request: T): Promise<HttpResponse>;

  public async execute(request: T): Promise<HttpResponse> {
    try {
      return await this.executeImpl(request);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      return this.fail();
    }
  }

  public static jsonResponse(code: number, message: string): HttpResponse {
    return {
      status: code,
      data: {
        message
      }
    };
  }

  public ok<T>(dto?: T): HttpResponse {
    if (dto) {
      return {
        status: 200,
        data: dto
      };
    } else {
      return {
        status: 200,
        data: {}
      };
    }
  }

  public created(): HttpResponse {
    return {
      status: 201,
      data: null
    };
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(400, message ? message : 'Bad Request!');
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(404, message ? message : 'Not found!');
  }

  public fail(error?: Error | string): HttpResponse {
    console.log(error);
    return {
      status: 500,
      data: {
        message: 'Internal server error!'
      }
    };
  }
}
