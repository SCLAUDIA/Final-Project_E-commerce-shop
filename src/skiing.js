import { http } from './http.js';
import {ui} from './ui.js';

// get getSkiingProducts on DOM Load
document.addEventListener('DOMContentLoaded', getSkiingProducts);
function getSkiingProducts(){
    // const http = new customHTTPMethods();
    http.get('http://localhost:3000/product')
    .then((data)=> ui.showSkiingProducts(data));
    }