import { http } from './http.js';
import {ui} from './ui.js';


console.log(window.location.search);
window.onload = () => {
    if (window.location.search !==''){
        const id = window.location.search.split('=')[1];
    
        http.get(`http://localhost:3000/product/${id}`  )  
        .then((data)=> ui.showDetails(data)) ;
    }
}




