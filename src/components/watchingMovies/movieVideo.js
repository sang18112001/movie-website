import getAPI from "../../api/api.js";

export default (idMovie) => {
   getAPI.getInfoDetail(idMovie, '/videos').then((data) => {
      const videos_list = data.results;
      const videoContainer = document.querySelector('.watching-video');
      videoContainer.innerHTML = `<iframe width="100%" height="500px" src="https://www.youtube.com/embed/${videos_list[0].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    });
    
}