const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const shuffleListData = data => {
  const size = data.length;
  const dummyArray = [];
  for (let i = 0; i < size; i++) dummyArray.push(i);

  // this returns a new shuffled array for position
  shuffleArray(dummyArray);

  // create new list based on shuffled array
  let newData = new Array(size);
  for (let i = 0; i < size; i++) {
    newData[i] = Object.assign({}, data[dummyArray[i]]);
  }

  return newData;
};

export {shuffleListData};
