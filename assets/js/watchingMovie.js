const urlParams = new URLSearchParams(window.location.search);
const needed_id = urlParams.get('id');
const VIDEOS_API = `https://api.themoviedb.org/3/movie/${needed_id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c`

// Get videos from Youtube following the key of each video
const getVideos = async () => {
    const response = await fetch(VIDEOS_API)
    const data = await response.json()
    const videos_list = data.results
    console.log(videos_list)
    // showVideos(videos_list)
}
getVideos()

// Show video
const showVideos = (videos_list) => {
    const videoContainer = document.querySelector('.player-movie')
    console.log(videoContainer)
    const embedVideos = []
    videos_list.forEach((video) => {
        let { name, key, site } = video
        embedVideos.push(`
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ThseAPVAtMQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `)
    })
    videoContainer.innerHTML = embedVideos.join('')
}