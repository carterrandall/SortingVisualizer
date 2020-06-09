module.exports = function callCountingSort(array) {
  console.log("original", array);

  const maxElement = Math.max(...array);
  const sorted = countingSort(array, [...array], maxElement);
  console.log("sorted", sorted);
};

function countingSort(array, sortingArray, k) {
  let refArray = [];

  //fill array with 0s
  for (let i = 0; i <= k; i++) {
    refArray[i] = 0;
  }

  for (let j = 0; j < array.length; j++) {
    refArray[array[j]] = refArray[array[j]] + 1;
  }
  console.log(refArray, "1");

  for (let i = 0; i <= k; i++) {
    if (i !== 0) {
      refArray[i] = refArray[i] + refArray[i - 1];
    }
  }

  console.log(refArray, "2")

  for (let j = array.length - 1; j >= 0; j--) {
    sortingArray[refArray[array[j]] - 1] = array[j];
    refArray[array[j]] = refArray[array[j]] - 1;
    console.log(refArray, "refArray", sortingArray, "Sorting")
  }



  return sortingArray;
}
