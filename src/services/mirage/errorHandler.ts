import { Response} from 'miragejs'

export const handleError = (error:any, message="Could not find the route") => {
    return new Response(400, undefined, {
        data: {
          message,
          isError: true,
        },
      });
}