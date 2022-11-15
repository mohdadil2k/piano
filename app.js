const KEY_URL = "https://intro.online.berklee.edu/audio/piano/";

const container_div=document.querySelector('.container');
const octave_up=document.querySelector('.octave-up');
const octave_down=document.querySelector('.octave-down');
const octave_info=document.querySelector('.current-octave h2')
const music_keys_id=document.getElementById('music-keys');
let audio;

let currentOctave=3;

function octaveUp(){
    if(currentOctave>=7) return
    currentOctave++;
    octave_info.innerText="Current Octave : " +currentOctave
    createHTML(currentOctave);
}
function octaveDown(){
    if(currentOctave<=1) return
    currentOctave--;
    octave_info.innerText="Current Octave : " +currentOctave
    createHTML(currentOctave);
}

function playAudio(){
    this.classList.add('key-pressed')
    audio=new Audio(`${KEY_URL}key_${this.dataset.note}.mp3`)
    audio.play();
}
function stopAudio(){
    this.classList.remove('key-pressed')
    // audio.pause();
    // audio.currentTime=0;
}
function getSingleKey(key1){
    const div=document.createElement('div');
    div.classList.add('key')
    div.dataset.note=key1;
    div.addEventListener('touchstart',playAudio)
    div.addEventListener('touchend',stopAudio)
    div.addEventListener('mousedown',playAudio);
    div.addEventListener('mouseup',stopAudio);

    return [div];
}
function getDoubleKey(key1,key2){
    const div1=document.createElement('div');
    div1.classList.add('key')
    div1.dataset.note=key1;
    div1.addEventListener('touchstart',playAudio)
    div1.addEventListener('touchend',stopAudio)
    div1.addEventListener('mousedown',playAudio);
    div1.addEventListener('mouseup',stopAudio)

    const div2=document.createElement('div');
    div2.classList.add('key')
    div2.classList.add('black')
    div2.dataset.note=key2;
    div2.addEventListener('touchstart',playAudio)
    div2.addEventListener('touchend',stopAudio)
    div2.addEventListener('mousedown',playAudio);
    div2.addEventListener('mouseup',stopAudio)

    return [div1,div2];

}
function createHTML(currentOctave){
    music_keys_id.innerHTML="";
    music_keys_id.classList.add('music-keys')   
    
    let lastKey=currentOctave*12;
    let firstKey=lastKey-12;
    
    let nthKey=0;

    for(let i=firstKey;i<=lastKey;i++){
            
    const key_container=document.createElement('div')
    key_container.classList.add('key-container')

        let html;
        if(nthKey===2 || nthKey===6 || nthKey ===7){
           html = getSingleKey(i)
        }else{
           html = getDoubleKey(i,i+1)
            i++;
        }
        nthKey++

        key_container.append(...html)
        music_keys_id.append(key_container)
    }
}
octave_up.addEventListener('click',octaveUp);
octave_down.addEventListener('click',octaveDown);
window.addEventListener('DOMContentLoaded',()=>createHTML(currentOctave));