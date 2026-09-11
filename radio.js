var audio = document.getElementById('jump-stream');
var btnIcon = document.getElementById('jr-icon');
var isPlaying = false;
var hlsPlayer = null;

var savedVolume = localStorage.getItem('jr_volume');
if (savedVolume !== null) {
    document.getElementById('jr-volume').value = savedVolume;
    audio.volume = savedVolume;
} else {
    audio.volume = 0.8;
}

var savedQuality = localStorage.getItem('jr_quality') || "https://nadajnik.jumpradio.net/listen/live/jump.mp3";
var currentStreamUrl = savedQuality;
var qualityBtns = document.querySelectorAll('.jr-quality-btn');

qualityBtns.forEach(function(btn) {
    if (btn.getAttribute('data-url') === savedQuality) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

function changeVolume() {
    var vol = document.getElementById('jr-volume').value;
    audio.volume = vol;
    localStorage.setItem('jr_volume', vol); 
}

function setQuality(btnElement) {
    var newUrl = btnElement.getAttribute('data-url');
    if (newUrl === currentStreamUrl) return; 

    qualityBtns.forEach(function(b) { b.classList.remove('active'); });
    btnElement.classList.add('active');

    currentStreamUrl = newUrl;
    localStorage.setItem('jr_quality', newUrl); 

    if (isPlaying) {
        toggleStream(); 
        toggleStream(); 
    }
}

function toggleStream() {
    if (isPlaying) {
        audio.pause();
        if (hlsPlayer) { hlsPlayer.destroy(); hlsPlayer = null; }
        audio.removeAttribute('src'); 
        audio.load(); 
        btnIcon.className = 'jr-play-icon';
        isPlaying = false;
    } else {
        var cacheBuster = new Date().getTime();
        var finalUrl = currentStreamUrl + (currentStreamUrl.indexOf('?') !== -1 ? '&' : '?') + 'cb=' + cacheBuster;

        if (currentStreamUrl.endsWith('.m3u8')) {
            if (typeof Hls !== 'undefined' && Hls.isSupported()) {
                hlsPlayer = new Hls();
                hlsPlayer.loadSource(currentStreamUrl);
                hlsPlayer.attachMedia(audio);
                hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function() { audio.play(); });
            } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
                audio.src = currentStreamUrl;
                audio.play();
            }
        } else {
            audio.src = finalUrl;
            audio.load();
            audio.play();
        }
        btnIcon.className = 'jr-pause-icon';
        isPlaying = true;
    }
}

async function fetchAzuraMetadata() {
    try {
        const response = await fetch('https://nadajnik.jumpradio.net/api/nowplaying');
        const data = await response.json();
        
        const station = Array.isArray(data) ? data[0] : data;
        const isLive = station.live.is_live;
        
        const metadataContainer = document.getElementById('jr-metadata');
        const statusLabel = document.getElementById('jr-status-label');
        
        if (isLive) {
            statusLabel.innerText = "GRAMY NA ŻYWO";
            const streamerName = station.live.streamer_name || "DJ";
            const showTitle = station.now_playing.song.title || "Audycja na żywo";
            metadataContainer.innerText = streamerName + " - " + showTitle;
        } else {
            statusLabel.innerText = "AKTUALNIE GRAMY";
            metadataContainer.innerText = "Jump Radio - U Nas Bass Cały Czas!";
        }
    } catch (error) {
        console.error("Nie udało się pobrać danych z AzuraCast:", error);
    }
}

fetchAzuraMetadata();
setInterval(fetchAzuraMetadata, 15000);

document.addEventListener('DOMContentLoaded', function() {
    var player = document.getElementById('jr-sticky-player');
    var anchor = document.getElementById('hero-anchor');
    
    window.addEventListener('scroll', function() {
        var anchorRect = anchor.getBoundingClientRect();
        var footer = document.querySelector('footer'); 
        
        if (anchorRect.bottom < 80) {
            player.classList.add('is-sticky');
            if (footer) {
                var footerRect = footer.getBoundingClientRect();
                if (footerRect.top < window.innerHeight) {
                    var lift = window.innerHeight - footerRect.top + 20; 
                    player.style.bottom = lift + 'px';
                } else {
                    player.style.bottom = '20px'; 
                }
            } else {
                player.style.bottom = '20px';
            }
        } else {
            player.classList.remove('is-sticky');
            player.style.bottom = 'initial';
        }
    });
});
