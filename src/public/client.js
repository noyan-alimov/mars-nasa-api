const { Map, List } = require('immutable');
import './assets/stylesheets/index.css';
import './assets/stylesheets/resets.css';

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
      <div id="output">
        <div id="roverInfo">
          ${showRoverInfo(roverInfo)}
        </div>
        <div id="images">
          ${showImages(images)}
        </div>
      </div>
  `;
};

const form = document.getElementById('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const select = document.getElementById('rovers');
  const rover = select.options[select.selectedIndex].value;
  getRoverInfoAndImages(rover);
});

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
  let imagesSliced;

  if (images.length > 6) {
    imagesSliced = images.slice(0, 6);
  } else {
    imagesSliced = images;
  }

  const imgs = imagesSliced.map(image => {
    return `
      <img src="${image}" height="200px" width="200px" />
    `;
  });
  return imgs;
};

const getRoverInfoAndImages = rover => {
  fetch(`http://localhost:3000/rovers?rover=${rover}`)
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
