const { Map, List } = require('immutable');
const { Observable } = require('rxjs');

let store = Map({
  roverInfo: {},
  images: []
});

const root = document.getElementById('root');

const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
};

const render = (root, state) => {
  root.innerHTML = App(state);
};

const App = state => {
  const data = state.toObject();
  const roverInfo = data.roverInfo.toObject();
  const images = data.images.toArray();

  return `
    <section>
      <h1>Mars API App</h1>
      ${showRoverInfo(roverInfo)}
      ${showImages(images)}
    </section>
  `;
};

const button = document.getElementById('button');
button.addEventListener('click', () => getRoverInfoAndImages());

window.addEventListener('load', () => {
  render(root, store);
});

const showRoverInfo = roverInfo => {
  return `
    <div>
      <p>Rover Name: ${roverInfo.name}</p>
      <p>Launch Date: ${roverInfo.launch_date}</p>
      <p>Landing Date: ${roverInfo.landing_date}</p>
      <p>Status: ${roverInfo.status}</p>
    </div>
  `;
};

const showImages = images => {
  const imgs = images.map(image => {
    return `
      <img src="${image}" height="100px" width="100px" />
    `;
  });
  return imgs;
};

const getRoverInfoAndImages = () => {
  fetch(`http://localhost:3000/rovers?rover=spirit`)
    .then(res => res.json())
    .then(data => {
      const photos = List(data.photos);
      const { landing_date, launch_date, name, status } = data.photos[0].rover;
      const roverInfo = Map({
        landing_date,
        launch_date,
        name,
        status
      });
      const images = List(photos.map(photo => photo.img_src));
      updateStore(store, { roverInfo, images });
    });
};
