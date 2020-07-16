const showImages = images => {
  const observable = new Observable(subscriber => {
    subscriber.next(images[0]);
    subscriber.next(images[1]);
    subscriber.next(images[2]);
  });

  observable.subscribe({
    next(x) {
      console.log(x);
      return `<img src="${x}" />`;
    },
    error(err) {
      console.error('something wrong occurred: ' + err);
    },
    complete() {
      console.log('done');
    }
  });
};
