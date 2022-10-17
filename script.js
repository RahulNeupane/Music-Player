const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')

const songs =  [
    {
        name: 'asitwas',
        displayName: 'As it Was',
        artist : 'Harry Styles'
    },
    {
        name: 'toxic',
        displayName: 'Toxic',
        artist : 'BoyWithUke'
    },
    {
        name: 'brownmunde',
        displayName: 'Brown Munde',
        artist : 'AP Dhillon'
    },
    {
        name: 'kesariya',
        displayName: 'Kesariya',
        artist : 'Pritam, Arijit'
    },
    {
        name: 'saami',
        displayName: 'Saami Saami',
        artist : 'Mounika Yadav'
    },
    {
        name: 'uti',
        displayName: 'Under The Influence',
        artist : 'Chris Brown'
    },
    {
        name: 'resham',
        displayName: 'Resham',
        artist : 'Nepathya'
    },
    {
        name: 'bindinglights',
        displayName: 'Binding Lights',
        artist : 'The Weekend'
    }
]
let isPlaying = false

function playSong(){
    music.play()
    playBtn.classList.replace('fa-play','fa-pause')
    playBtn.setAttribute('title','Pause')
    isPlaying = true
    image.classList.add('animate')
}
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace('fa-pause','fa-play')
    playBtn.setAttribute('title','Play')
    music.pause()
    image.classList.remove('animate')
}

playBtn.addEventListener('click',()=>(isPlaying?  pauseSong():playSong()))

function loadSong(song){
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `./music/${song.name}.mp3`
    image.src = `./img/${song.name}.jpg`
}

let songIndex = Math.floor(Math.random() * songs.length)

loadSong(songs[songIndex])

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
music.addEventListener('timeupdate',updateProgressBar)
music.addEventListener('ended',nextSong)
progressContainer.addEventListener('click',setProgressBar)

function prevSong(){
    songIndex--
    if(songIndex<0) songIndex = songs.length-1
    loadSong(songs[songIndex])
    playSong()
}
function nextSong(){
    songIndex++
    if(songIndex>songs.length-1) songIndex = 0
    loadSong(songs[songIndex])
    playSong()
}
function updateProgressBar(e){
    if(isPlaying){
        const {currentTime, duration} = e.srcElement
        const progressPercent = (currentTime/duration) * 100
        progress.style.width = `${progressPercent}%`
        const durationMin = Math.floor(duration/60)
        let durationSec = Math.floor(duration % 60)
        if(durationSec<10){
            durationSec = `0${durationSec}`
        }
        //to avoid NaN
        if(durationSec){
            durationEl.textContent = `${durationMin}:${durationSec}`
        }

        const currentMin = Math.floor(currentTime/60)
        let currentSec = Math.floor(currentTime % 60)
        if(currentSec<10){
            currentSec = `0${currentSec}`
        }
        //to avoid NaN
        if(currentSec){
            currentTimeEl.textContent = `${currentMin}:${currentSec}`
        }
    }
}

function setProgressBar(e){
    const width = this.clientWidth
    let clickX = e.offsetX
    const {duration} = music
    music.currentTime = (clickX/width) * duration
    if(!isPlaying) playSong()
}