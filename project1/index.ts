//NOTE:모든 경우의 수를 구해서 최대값 찾기
const input = [1, 3, 5, 7, 9];

let maxValue = 0;
let bestPair = ["", ""];

// 순열 생성 함수
// 재귀 함수로 순열 생성
function getPermutations(arr: number[]): number[][] {
  if (arr.length === 1) return [arr];

  const result: number[][] = [];

  // 배열의 각 요소를 기준으로 순열 생성
  arr.forEach((_, i) => {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getPermutations(rest);
    perms.forEach((perm) => result.push([arr[i], ...perm]));
  });

  return result;
}

/**
 * 1. 5P5 순열 리스트 생성
 * 2. 순열 리스트 중 두 그룹으로 나누기
 * 3. 각 그룹의 수 곱하기
 * 4. 최대값 찾기
 */
function main() {
  const perms = getPermutations(input);

  // console.log(perms.length);
  perms.forEach((perm) => {
    for (let i = 1; i < perm.length; i++) {
      const group1 = perm.slice(0, i);
      const group2 = perm.slice(i);

      //수 만들기
      const num1 = Number(group1.join(""));
      const num2 = Number(group2.join(""));
      const tempValue = num1 * num2;

      //   console.log(num1, num2, tempValue);

      // 최대값 찾기
      if (tempValue > maxValue) {
        maxValue = tempValue;
        bestPair = [String(num1), String(num2)];
      }
    }
  });
}

main();
console.log("result:", bestPair.join(", "));
