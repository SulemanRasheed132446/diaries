import Axios, { AxiosError, AxiosResponse } from "axios";

const https = Axios.create({
});

https.defaults.baseURL = "https://diaries.com";

https.interceptors.response.use(
    async (response: AxiosResponse) => {
        if(response.status >= 200 && response.status <= 300) {
            return response.data;
        }
    },
    (error: AxiosError) => {
        const {request, response}: {
            request?:XMLHttpRequest,
            response?:AxiosResponse
        } = error;

        if (response) {
            if (response.status >= 400 && response.status < 500) {

            }
          } else if (request) {
              
          }
          return Promise.reject(error);
    }
)

export default https;