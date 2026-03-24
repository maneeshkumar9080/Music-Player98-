// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle dark mode on the body
    let isDark = document.body.classList.toggle('dark-mode');
    
    // Save the user's preference to localStorage
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    
    // Get the toggle icon (assumed to have class 'theme_default')
    let isToggleOn = document.querySelector('.theme_default');
    let commonChangeColor=document.querySelectorAll('.common')
    if (isToggleOn) {
        // If dark mode is enabled
        if (isDark) {
            isToggleOn.classList.add('fa-toggle-on');
            isToggleOn.classList.remove('fa-toggle-off');
            isToggleOn.classList.add('theme_default_dark');
            isToggleOn.classList.remove('theme_default_light');
          
            commonChangeColor.forEach(element => {
                console.log(element)
                element.classList.add('background-common-dark');
                element.classList.remove('background-common');
              
            });
        
           
        } else {
            // If dark mode is disabled
            isToggleOn.classList.add('fa-toggle-off');
            isToggleOn.classList.remove('fa-toggle-on');
            isToggleOn.classList.add('theme_default_light');
            isToggleOn.classList.remove('theme_default_dark');
        }
    }
}

// On page load, check the localStorage value to set the initial theme
document.addEventListener('DOMContentLoaded', () => {
    // Check if dark mode was enabled previously in localStorage
    let isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    
    // If dark mode was enabled, apply it
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        
        // Change the icon to the "on" state
        let isToggleOn = document.querySelector('.theme_default');
        let commonChangeColor=document.querySelectorAll('.common')
        if (isToggleOn) {
            isToggleOn.classList.add('fa-toggle-on');
            isToggleOn.classList.remove('fa-toggle-off');
            isToggleOn.classList.add('theme_default_dark');
            isToggleOn.classList.remove('theme_default_light'); commonChangeColor.forEach(element => {
                console.log(element)
                element.classList.add('background-common-dark');
                element.classList.remove('background-common');
              
            });

        }
    } else {
        // If dark mode was not enabled, make sure the light theme i
    }
});

// list to be shown as per selected item
const songs = [
    { name: "Aayi Nai", language: "hindi" ,audioUrl:"./music/Aayi Nai - Stree 2.mp3",artist:"Simran Choudhary",image:"./images/aayi_nahi.webp"},
    { name: "Carried Away Madison Beer2", language: "english" ,audioUrl:"./music/Carried.mp3" ,artist:"Surf Mesa",image:"./images/carried_away.jpg"},
    { name: "Mayavi", language: "kannada" ,audioUrl:"./music/Mayavi.mp3",artist:"sonu nigam",image:"./images/mayavi.webp" },
    { name: "Play Date", language: "english" ,audioUrl:"./music/Play Date Lilly Brooks.mp3",artist:"Lilly BrooksLilly Brooks",image:"./images/play-date.jpg" },
    { name: "Your Power", language: "english" ,audioUrl:"./music/Your Power Billie Eilish.mp3" ,artist:"Billie Eilish",image:"./images/power.jpg"}
];

// Function to display songs based on selected language
function displaySelectedValue() {
    const selectedLanguage = document.getElementById('songs').value;
    const songList = document.getElementById('songList');

    // Clear current song list
    songList.innerHTML = "";

    // Filter songs based on the selected language
    const filteredSongs = songs.filter(song => {
        return selectedLanguage === "all" || song.language === selectedLanguage;
    });

    // Display filtered songs
    filteredSongs.forEach(song => {
        const listItem = document.createElement('li');
        listItem.textContent = song.name;

        // Add onclick event to each song
        listItem.onclick = function() {
            handleSongClick(song);
        };

        songList.appendChild(listItem);
    });
}

// Call the function to display all songs initially
displaySelectedValue();
let songImgEle=document.getElementById('song_img')
let songNameEle=document.getElementById('song_name')
let songArtistEle=document.getElementById('song_artist')
   // Set the source of the audio player
   const audioPlayer = document.getElementById("audioPlayer");
   const audioSource = document.getElementById("audioSource");

let createPlaylistEle=document.getElementById('createPlaylist').addEventListener('click',createList);
let prevSongEle=document.getElementById('prevSong').addEventListener('click',prevSong);
let nextSongEle=document.getElementById('nextSong').addEventListener('click',nextSong);
let playList_createdEle=document.querySelectorAll('.playList_created');
let inputPlaylistEle=document.getElementById('inputPlaylist');
let currentPlaylistEle=document.getElementById('currentPlaylist');
let add_playlistEle=document.getElementById('add_playlist').addEventListener('click',addToPlaylist)
   let currentSongIndex = 0;
// Function to handle song click event
function handleSongClick(song) {
   
   
    songImgEle.src=song.image;
    songNameEle.innerHTML=song.name;
    songArtistEle.innerHTML=song.artist;

  
     // Set the song's audio file URL
     audioSource.src = song.audioUrl;
     
     // Reload the audio element and play the song 
        audioPlayer.load();
        audioPlayer.play();
}
// Function to play the first song by default
function playFirstSong() {
    const firstSong = songs[0]; // Get the first song in the array
    songImgEle.src=firstSong.image;
    songNameEle.innerHTML=firstSong.name;
    songArtistEle.innerHTML=firstSong.artist;
    audioSource.src = firstSong.audioUrl;
    audioPlayer.load();  // Call the handleSongClick function to play the first song
}

// Function to go to the previous song
function prevSong() {
    // Decrease the current song index, wrapping around if necessary
    currentSongIndex = (currentSongIndex === 0) ? songs.length - 1 : currentSongIndex - 1;

    // Get the song at the new index and play it
    const prevSong = songs[currentSongIndex];
    handleSongClick(prevSong);
}

// Function to go to the next song
function nextSong() {
    // Increase the current song index, wrapping around if necessary
    currentSongIndex = (currentSongIndex === songs.length - 1) ? 0 : currentSongIndex + 1;

    // Get the song at the new index and play it
    const nextSong = songs[currentSongIndex];
    handleSongClick(nextSong);
}

// Call playFirstSong when the page loads
let firstload=window.onload = function() {
    playFirstSong();  // Load and play the first song
};
let getListName=[];
const playlists = {};
let storePlaylist;
function createList(){
    let valueInput=inputPlaylistEle.value;
    if (valueInput.trim() !== "") {  // Ensure input is not empty
        const listItem = document.createElement('li');
        listItem.textContent = valueInput;
        listItem.id=valueInput
        listItem.addEventListener('click', function() {
            showPlaylist(valueInput);
        })
        storePlaylist=valueInput;
    
   // Append to all "All Playlist" sections
   const playListSections = document.querySelectorAll('.playList_created');
   playList_createdEle.forEach(section => {
       section.appendChild(listItem);
   });
   
   // Add the playlist to the playlists object
   playlists[valueInput] = [];
   inputPlaylistEle.value = "";  // Clear the input after adding
} else {
   alert('Please enter a playlist name');
}
}

// Function to show the songs in the selected playlist

function showPlaylist(playlistName) {
    currentPlaylistEle.innerHTML = '';  // Clear current playlist display

    // Get the songs for the clicked playlist
    const songList = playlists[playlistName];
    
    // If the playlist has songs, display them
    if (songList.length > 0) {
        songList.forEach(songName => {
            const listItem = document.createElement('li');
            listItem.textContent = songName;
            currentPlaylistEle.appendChild(listItem);
        });
    } else {
        currentPlaylistEle.textContent = "No songs in this playlist yet.";
    }
}
function addToPlaylist() {
    const playlistName = storePlaylist;
    
    // Check if a playlist is selected
    if (playlistName !== "") {
        let currentSong = songs[currentSongIndex].name;

        // Add song to the selected playlist
        playlists[playlistName].push(currentSong);

        // Update the playlist display
        showPlaylist(playlistName);  // Refresh the playlist display

       
    } else {
        
    }
}