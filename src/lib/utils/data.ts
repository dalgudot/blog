export const objectToArray = (object: object) => {
  return Object.values(object);
};

// 정렬
// https://dudmy.net/javascript/2015/11/16/javascript-sort/
export const characterSort = (array: string[]) => {
  array.sort();
};

export const numberAscendingSort = (array: number[]) => {
  array.sort(function (a, b) {
    // 오름차순
    return a - b;
  });
};

export const numberDescendingSort = (array: number[]) => {
  array.sort(function (a, b) {
    // 내림차순
    return b - a;
  });
};

// export const objectAscendingSort = <T extends {}>(array: T[], ): T[] => {
//   array.sort(function (a, b) {
//     // 오름차순
//     return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
//   });
// };

// export const objectDescendingSort = (array: []) => {
//   array.sort();
// };
