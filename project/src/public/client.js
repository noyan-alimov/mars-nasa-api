const root = document.getElementById('root');

fetch(`http://localhost:3000/rovers/?rover=spirit`)
  .then(res => res.json())
  .then(data => {
    // console.log(data.photos);
    const { landing_date, launch_date, name, status } = data.photos[0].rover;
    const roverInfo = {
      landing_date,
      launch_date,
      name,
      status
    };
    // console.log(roverInfo);
    const images = data.photos.map(photo => photo.img_src);
    console.log(images);
  });
