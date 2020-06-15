import Axios, { AxiosResponse } from "axios";
import { IActivity } from "../../models/IActivity";

Axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

//currying a function: sequence of nested functions
const sleep = (ms: number) => (response: AxiosResponse) => 
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const requests = {
    get: (url: string) => Axios.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, body: {}) => Axios.post(url, body).then(sleep(1000)).then(responseBody),
    put: (url: string, body: {}) => Axios.put(url, body).then(sleep(1000)).then(responseBody),
    delete: (url: string) => Axios.delete(url).then(sleep(1000)).then(responseBody),
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get("/activities"),
    details: (Id: string) =>  requests.get(`/activities/${Id}`),
    create: (Activity: IActivity) =>  requests.post("/activities", Activity),
    update: (Activity: IActivity) =>  requests.put(`/activities/${Activity.Id}`, Activity),
    delete: (Id: string) => requests.delete(`/activities/${Id}`)
}

export default { Activities }