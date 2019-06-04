export default {
  // 随机整数
  int(min: number, max: number) {
    // max is not included
    return min + Math.floor(Math.random() * (max - min));
  },
  // 数组随机选一个
  choice(arr: Array<any>) {
    const index = this.int(0, arr.length);
    return arr[index];
  },
};
