import { http } from './http.js';
import {ui} from './ui.js';

// get getSnowboardingProducts on DOM Load

document.addEventListener('DOMContentLoaded', getSnowboardingProducts);
function getSnowboardingProducts(){
    // const http = new customHTTPMethods();
    http.get('http://localhost:3000/product')
    .then((data)=> ui.showSnowboardingProducts(data));
    }