import { http } from './http.js';
import {ui} from './ui.js';
// get products on DOM Load
// document.addEventListener('DOMContentLoaded', getProducts);
// function getProducts(){
//     // const http = new customHTTPMethods();
//     http.get('http://localhost:3000/product')
//     .then((data)=> ui.showProducts(data));
// }

const sliderContainer = document.querySelector(".glide__track");
const slide = document.querySelector(".glide__slides");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const interval = 3000;


//  ********** start auto-play slider functions **********
let slides = document.querySelectorAll(".glide__slide");
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

const slideWidth = slides[index].clientWidth;
slide.style.transform = `translateX(${-slideWidth * index}px)`;
console.log(slides);

const startSlide = ()=>{
    slideId = setInterval(()=>{
        moveToNextSlide();
    }, interval);
}

slide.addEventListener('transitionend',() => {
    slides = document.querySelectorAll(".glide__slide");
    if(slides[index].id === firstClone.id){
        slide.style.transition = 'none';
        index=1;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
    if(slides[index].id === lastClone.id){
        slide.style.transition = 'none';
        index = slides.length - 2;
        slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
});

const moveToNextSlide = () =>{
    slides = document.querySelectorAll(".glide__slide");
    if(index >= slides.length - 1) return;
    index++;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '1s';
}

const moveToPreviousSlide = () =>{
    if(index <= 0) return;
    index--;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
    slide.style.transition = '1s';
}


nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);



sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideId);
});
sliderContainer.addEventListener('mouseleave', startSlide)

startSlide();
//  ********** end auto-play slider functions **********


//  Add product to db



 

