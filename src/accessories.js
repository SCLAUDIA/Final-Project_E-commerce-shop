
import { http } from './http.js';
import {ui} from './ui.js';

// get getAccessoriesProducts on DOM Load
document.addEventListener('DOMContentLoaded', getAccessoriesProducts);
function getAccessoriesProducts(){
    http.get('http://localhost:3000/product')
    .then((data)=> ui.showAccessoriesProducts(data));
}