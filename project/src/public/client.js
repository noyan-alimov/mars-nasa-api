const { Map, List } = require('immutable');

const root = document.getElementById('root');

fetch(`http://localhost:3000/rovers/?rover=spirit`)
  .then(res => res.json())
  .then(data => {
    const photos = List(data.photos);
    // console.log(data.photos);
    const { landing_date, launch_date, name, status } = data.photos[0].rover;
    const roverInfo = Map({
      landing_date,
      launch_date,
      name,
      status
    });
    // console.log(roverInfo);
    const images = List(photos.map(photo => photo.img_src));
    // console.log(images);
  });
