const root = document.documentElement;

const timeline = document.querySelector(".timeline");
const progressLine = document.querySelector(".progress-line");
const stepPositions = document.querySelectorAll(".step-position");
const process = document.querySelector(".process");
const processHeading = document.querySelector(".process-header");
const results = document.querySelector(".rezultati");
const heroResults = document.querySelector(".hero-rezultati");
let gallery = document.querySelector(".gallery");
let galleryCards = document.querySelectorAll(".gallery-card");
const forwardButton = document.getElementById("forward-button");
const backwardButton = document.getElementById("backward-button");
backwardButton.disabled = true;
const forwardControl = document.querySelector(".forward-control");
const backwardControl = document.querySelector(".backward-control");
backwardControl.disabled = true;

const firstVideo = document.querySelector(".video-1");
const secondVideo = document.querySelector(".video-2");
const thirdVideo = document.querySelector(".video-3");
const mainVideo = document.querySelector(".main-video");
const video = document.querySelector(".main-testemonial");

const klijent = document.querySelector(".klijent-ime");
const citat = document.querySelector(".klijent-utisak");
const trajanje = document.querySelector(".trajanje-content");
const activeVideo = document.querySelector(".active-video");

const playVideoBtn = document.querySelector(".play-video-btn");
const pitanjeBtn = document.querySelectorAll(".pitanje-btn");
const odgovor = document.querySelectorAll(".faq-odgovor");
const faqKartica = document.querySelectorAll(".faq-kartica");
const faqPitanje = document.querySelectorAll(".faq-pitanje");
const finalniCta = document.querySelector(".finalni-cta-dugme");
const karticaCta = document.querySelectorAll(".kartica-cta");

function updateProgress(){
    const timelinePosition = timeline.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.5; 

    const passedDistance = triggerPoint - timelinePosition.top;
    const scrollRange = timelinePosition.height * 1;
    const progress = passedDistance / scrollRange;
    const limitedProgress = Math.min(Math.max(progress, 0), 1);

    progressLine.style.transform = `scaleY(${limitedProgress})`;
}

let progressTicking = false;

function requestProgressUpdate(){
    if(progressTicking) return;

    progressTicking = true;

    requestAnimationFrame(() =>{
        updateProgress();
        progressTicking = false;
    });
}

window.addEventListener("scroll", requestProgressUpdate, {
    passive: true
});
window.addEventListener("load", updateProgress)

function setTimelineLine(){

    stepPositions.forEach((stepPosition) =>{
        const middle = window.innerWidth * 0.5;
        const position = stepPosition.getBoundingClientRect();
        const timelinePosition = timeline.getBoundingClientRect();
        const timelineLeft = timelinePosition.left;
        const timelineRight = timelinePosition.right;
        const stepInfo = stepPosition.querySelector(".step-info");
        let width = 0;
        let connectorWidth = 0;
        if (middle > position.left){
            width = position.left + position.width;
            connectorWidth = timelineLeft - width;
        }
        else{
            width = position.left - timelineRight;
            connectorWidth = width;
        }
    
        stepInfo.style.setProperty("--connector-width", `${connectorWidth}px`);
    });
}


setTimelineLine();
window.addEventListener("resize", setTimelineLine);

// gallery.addEventListener("wheel", (event) =>{
//     event.preventDefault();

//     gallery.scrollBy({
//         left: event.deltaY
//     });

// }, {passive: false});

let currentCard = 0;
let resizeTimer;

function addCard(){
    const card1 = document.createElement("div");
    card1.className = "gallery-card";
    card1.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>01</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card1)

    const card2 = document.createElement("div");
    card2.className = "gallery-card";
    card2.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>02</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card2)

    const card3 = document.createElement("div");
    card3.className = "gallery-card";
    card3.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>03</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card3)

    const card4 = document.createElement("div");
    card4.className = "gallery-card";
    card4.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>04</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card4)
    const card5 = document.createElement("div");
    card5.className = "gallery-card";
    card5.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>05</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card5)

    const card6 = document.createElement("div");
    card6.className = "gallery-card";
    card6.innerHTML = `
        <div class="gallery-card-left">
            <img src="images/rezultat1.png" alt="">
            <p class="pre">PRE</p>
            <p class="posle">POSLE</p>
            <button class="transformation-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#87cefa" viewBox="0 0 256 256"><path d="M201.57,54.42a104,104,0,1,0,0,147.15A104.17,104.17,0,0,0,201.57,54.42Zm-75.91,79.24-32,32a8,8,0,1,1-11.32-11.32L108.68,128,82.32,101.64A8,8,0,1,1,93.64,90.32l32,32A8,8,0,0,1,125.66,133.66Zm56,0-32,32a8,8,0,0,1-11.32-11.32L164.71,128l-26.36-26.36a8,8,0,1,1,11.32-11.32l32,32A8,8,0,0,1,181.68,133.66Z"></path></svg></button>

        </div>

        <div class="gallery-card-right">
            <div class="transformacija-ime">
                <p>MARKO JOVANOVIĆ</p>
            </div>

            <div class="transformacija-stats">
                <div class="stat" id="prvi-stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M240,128v64a8,8,0,0,1-8,8H168a8,8,0,0,1-5.66-13.66L188.69,160,136,107.31l-34.34,34.35a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,29.66,58.34L96,124.69l34.34-34.35a8,8,0,0,1,11.32,0L200,148.69l26.34-26.35A8,8,0,0,1,240,128Z"></path></svg>
                    <p>-14 KG</p>
                </div>
                
                <svg class="crtica" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"></path></svg>                                
                <div class="stat">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM84,184a12,12,0,1,1,12-12A12,12,0,0,1,84,184Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,128,144Zm44,40a12,12,0,1,1,12-12A12,12,0,0,1,172,184Zm0-40a12,12,0,1,1,12-12A12,12,0,0,1,172,144Zm36-64H48V48H72v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24Z"></path></svg>
                    <p>12 NEDELJA</p>
                </div>

            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-32,16h7.6A80.15,80.15,0,0,1,136,207.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16Zm-32-8a40,40,0,1,1-40-40A40,40,0,0,1,168,128Z"></path></svg>

                <div class="cilj-opis">
                    <p class="cilj-naslov">CILJ</p>
                    <p class="cilj-tekst">Gubitka masnog tkiva i izgradnja snage</p>
                </div>
            </div>

            <div class="transformacija-cilj">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,32H163.74a47.92,47.92,0,0,0-71.48,0H56A16,16,0,0,0,40,48V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V48A16,16,0,0,0,200,32Zm-72,0a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm32,128H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Zm0-32H96a8,8,0,0,1,0-16h64a8,8,0,0,1,0,16Z"></path></svg>
                <div class="cilj-opis">
                    <p class="cilj-naslov">PLAN</p>
                    <p class="cilj-tekst">4 treninga nedeljno &bull; personalizovana ishrana &bull; nedeljne provere</p>
                </div>
            </div>

            <div class="transformacija-citat">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M116,72v88a48.05,48.05,0,0,1-48,48,8,8,0,0,1,0-16,32,32,0,0,0,32-32v-8H40a16,16,0,0,1-16-16V72A16,16,0,0,1,40,56h60A16,16,0,0,1,116,72ZM216,56H156a16,16,0,0,0-16,16v64a16,16,0,0,0,16,16h60v8a32,32,0,0,1-32,32,8,8,0,0,0,0,16,48.05,48.05,0,0,0,48-48V72A16,16,0,0,0,216,56Z"></path></svg>
                <p><em>Plan je bio realan, jasan i prilagodjen mom tempu</em> ~ Marko (27)</p>
            </div>

            <div class="transformacija-redosled">
                <p><span>06</span> / 06</p>
                <div class="circle-navigation">
                    <svg class="active-circle" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path></svg>
                </div>
            </div>
        </div>
    `
    gallery.appendChild(card6)
    galleryCards = document.querySelectorAll(".gallery-card");
}

function scrollTo(index){
    if (index < 0 || index >= galleryCards.length) return;

    currentCard = index;

    gallery.scrollTo({
        left: galleryCards[currentCard].offsetLeft - gallery.offsetLeft,
        behavior: "smooth"
    });

    backwardButton.disabled = currentCard === 0;
    backwardControl.disabled = currentCard === 0;

    if(currentCard === galleryCards.length - 2){
        addCard();
    }
    
};

function scrollForward(){
    scrollTo(currentCard + 1);
}

function scrollBackward(){
    scrollTo(currentCard - 1);
}

forwardButton.addEventListener("click", scrollForward);
backwardButton.addEventListener("click", scrollBackward);

forwardControl.addEventListener("click", scrollForward);
backwardControl.addEventListener("click", scrollBackward);

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        scrollTo(currentCard, "auto");
    }, 100);
});

gallery.addEventListener("keydown", (event) =>{
    if(event.key === "ArrowRight"){
        event.preventDefault();
    }

    if(event.key === "ArrowLeft"){
        event.preventDefault();
    }
});

// gallery.addEventListener("wheel", (event) =>{
//     event.preventDefault();
// })

gallery.addEventListener("wheel", (event) => {
    const horizontalScroll = Math.abs(event.deltaX) > Math.abs(event.deltaY);

    if(horizontalScroll || event.shiftKey){
        event.preventDefault();
    }
});


const videos = {

    videoOne: {
        klijent: "Marko Jovanovic",
        citat: "Plan se uklapa u moj zivot, a rezultat je dosao bez ekstremne dijete",
        trajanje: "12 nedelja",
        src: "videos/video-1.mp4",
        class: ".video-1"
    },
    
    videoTwo: {
        klijent: "Petar Petrovic",
        citat: "Trener je jako supportive, predlazem svima da rade sa njim",
        trajanje: "6 nedelja",
        src: "videos/video-2.mp4",
        class: ".video-2"

    },
    
    videoThree: {
        klijent: "Vanja Vidovic",
        citat: "Sve pohvale, profesionalnost na nivou ili tako nesto",
        trajanje: "15 nedelja",
        src: "videos/video-3.mp4",
        class: ".video-3"
    }
}

let selectedVideo = videos["videoOne"];

function playVideoOnLoad(){
    playVideo("videoOne");
}

playVideoOnLoad();

function playVideo(clickedVideo){
    if(selectedVideo === videos[clickedVideo]) return;
    firstVideo.classList.remove("playing-video");
    secondVideo.classList.remove("playing-video");
    thirdVideo.classList.remove("playing-video");
    playVideoBtn.style.display = "block";
    selectedVideo = videos[clickedVideo];
    klijent.textContent = selectedVideo.klijent;
    citat.textContent = selectedVideo.citat;
    trajanje.textContent = selectedVideo.trajanje;
    activeVideo.src = selectedVideo.src;
    let videoDiv = document.querySelector(`${selectedVideo.class}`);
    videoDiv.classList.add("playing-video");

}

firstVideo.addEventListener("click", () => playVideo("videoOne"));
secondVideo.addEventListener("click", () => playVideo("videoTwo"));
thirdVideo.addEventListener("click", () => playVideo("videoThree"));
playVideoBtn.addEventListener("click", () =>{
    video.play();
    playVideoBtn.style.display = "none";
    
});
// mainVideo.addEventListener("click", () => {
//     video.pause();
//     playVideoBtn.style.display = "block";
// });

function faqOn(index){
    odgovor[index].style.display = "block";
    pitanjeBtn[index].textContent = "-";
    pitanjeBtn[index].style.backgroundColor = getComputedStyle(root).getPropertyValue('--primary-color');
    pitanjeBtn[index].style.color = getComputedStyle(root).getPropertyValue('--secondary-background-color');
    faqKartica[index].style.borderColor = getComputedStyle(root).getPropertyValue('--primary-color');
    // odgovor[index].scrollIntoView({
    //     behavior: "smooth",
    //     block: "start"
    // })
   
}

function faqOff(index){
    odgovor[index].style.display = "none";
    pitanjeBtn[index].textContent = "+";
    pitanjeBtn[index].style.backgroundColor = getComputedStyle(root).getPropertyValue('--secondary-background-color');
    pitanjeBtn[index].style.color = getComputedStyle(root).getPropertyValue('--primary-color');
    faqKartica[index].style.borderColor = getComputedStyle(root).getPropertyValue('--border-color');
}

faqPitanje.forEach((pitanje, index) =>{
    pitanje.addEventListener("click", () =>{
        const display = getComputedStyle(odgovor[index]).display;
        display === "none" ? faqOn(index) : faqOff(index);
    });
});


finalniCta.addEventListener("click", ()=>{
    window.open("https://calendly.com/jovicicdigital/intro-call", "_self");
});

karticaCta.forEach((kartica) =>{
    kartica.addEventListener("click", ()=>{
        window.open("https://calendly.com/jovicicdigital/intro-call", "_self");
    });
});