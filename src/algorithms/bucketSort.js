module.exports = function bucketSort(array) {
  //assumes input is between [0 , 1)
  let n = array.length - 1;
  let auxArray = [];
  for (let i = 0; i < n - 1; i++) {
    auxArray[i] = [];
  }
  for (let i = 0; i < n; i++) {
    auxArray[Math.floor[n * array[i]]];
  }
};
