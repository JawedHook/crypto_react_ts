import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import apiConfig from '../config/api.config';

// Routes
const baseURL: string = 'https://coinlib.io/api/v1/';
const listUrl: string = 'coinlist';
const coinUrl: string = 'coin';

let apiInstance: AxiosInstance;

const instance = () => {
  const instanceConfig: AxiosRequestConfig = {
    baseURL,
    responseType: 'json',
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (!apiInstance) {
    apiInstance = axios.create(instanceConfig);
  }
  return apiInstance;
};

// API methods
const coinApiService = {
  getCoins: (): Promise<any> => {
    return instance().get<string, AxiosRequestConfig>(listUrl, {
      params: {
        key: apiConfig.currencyApiToken,
        pref: 'EUR',
        order: 'price_desc',
      },
    });
  },
  getCoin: (symbol:string): Promise<any> => {
    return instance().get<string, AxiosRequestConfig>(coinUrl, {
      params: {
        key: apiConfig.currencyApiToken,
        pref: 'EUR',
        symbol
      },
    });
  }
};

export default coinApiService;
