let $ = document.querySelector.bind(document);
let $$= document.querySelectorAll.bind(document);

let listSongs = $(".list-songs")
let headingSong = $(".player__name");
let avatarSong = $(".player__control--avatar");
let audio = $(".play__audio")
let pause = $('.control-pause')
let nextBtn = $('.control-next')
let backBtn = $('.control-back')



const APP = {
    currentIndex: 0,
    isPlaying: false,
    songs: [
        {
            name: 'Mưa tháng sáu',
            singer: 'Văn Mai Hương',
            path: './Songs/MuaThangSau.mp3',
            avatar: './Images/MaiVanHuong.jpg'
        },
        {
            name: 'Bật tình yêu lên',
            singer: 'Hòa Minzy',
            path: './Songs/BatTinhYeuLen.mp3',
            avatar: './Images/HoaMinzy.jpg'
        },
        {
            name: 'Em đồng ý',
            singer: 'Đức Phúc',
            path: './Songs/EmDongY.mp3',
            avatar: './Images/DucPhuc.jpg'
        },
        {
            name: 'Ghệ yêu dấu của em ơi',
            singer: 'tlink',
            path: './Songs/GheIuDauCuaEmOi.mp3',
            avatar: './Images/tlink.jpg'
        },
        {
            name: 'Là do em xui thôi',
            singer: 'Khói, Đan Trang, Châu Đăng Khoa',
            path: './Songs/LaDoEmXuiThoi.mp3',
            avatar: './Images/LaDoemXuiThoi.jpg'
        },
        {
            name: 'Nếu Lúc Đó',
            singer: 'tlink',
            path: './Songs/NeuLucDo.mp3',
            avatar: './Images/tlink-neuLucDo.jpg'
        },
        
    
    ],

    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },
// render list song
    renderSongs: function(){
        let htmls = this.songs.map((song, index) => {
            return `    
            <li class="song__item" data-index = ${index}>
                <img src="${song.avatar}" alt="singer" class="song__item--avatar">
                <div class="song__infomation">
                     <h4 class="song__infomasion--name">${song.name}</h4>
                    <span class="song__infomation--singer">${song.singer}</span>
                 </div>
            </li>
            `
        })
       
        listSongs.innerHTML = htmls.join(' ');
    },

//render playing song
    loadCurrentSong: function () {
            headingSong.innerText = this.currentSong.name;
            avatarSong.src = this.currentSong.avatar;
            audio.src = this.currentSong.path;
    },


    handleEvent: function(){

// CD rotate
        let avataRoute = avatarSong.animate([
            {transform: 'rotate(360deg)',}
        ], 
        {
            duration: 10000,
            iterations: Infinity,
        }
        )
        avataRoute.pause()

       
//next song
       nextBtn.onclick = function(){
            APP.NextSong()
            audio.play()
       }
    
       backBtn.onclick = function(){
         APP.BackSong()
         audio.play()
       }


// Pause|Play audio
        pause.onclick = function(){
            if(APP.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }
        audio.onplay = function() {
            APP.isPlaying = true
            pause.innerText = 'Pause' 
            avataRoute.play()
        }
        audio.onpause = function(){
            APP.isPlaying = false;
            pause.innerText = 'Play' 
            avataRoute.pause()
        }
//week audio
        let range = $('.player__control--range')
        audio.ontimeupdate = function(){
            range.value = this.currentTime / this.duration *100;
        }
        range.oninput = function(){
            audio.currentTime = this.value * audio.duration /100;
        }
// next when audio ended
        audio.onended = function(){
            APP.NextSong()
            audio.play()
        }
        
// play the song when it is clicked
        listSongs.onclick = function(e){
            let songChosed = e.target.closest(".song__item")
            if(songChosed){
                if(APP.currentIndex !== songChosed.getAttribute('data-index')){
                    APP.currentIndex = songChosed.getAttribute('data-index')
                    APP.loadCurrentSong();
                    audio.play()
                }
            }
        }
    },


    NextSong: function (){
        this.currentIndex ++;
        if(this.currentIndex === this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    BackSong: function(){
        this.currentIndex -= 1;
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length-1;
        }
        this.loadCurrentSong()
    },
    songActive: function(){
        
    },
    start: function () {
        this.defineProperties()
        this.renderSongs()
        this.handleEvent()
        this.loadCurrentSong()
    },

}

APP.start()