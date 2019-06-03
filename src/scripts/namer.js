// import $ from 'jquery';
import rand from "./rand";
const books = require("./json/*.json");

class Namer {
  constructor() {
    // this.book = null;
    this.count = 6;
    // console.log(Object.values(books).reduce((a, b) => [...a, ...b]));
    this.book = Object.values(books).reduce((a, b) => [...a, ...b]);
  }

  // 去除符号
  formatStr(str) {
    // const res = str.replace(/[\s　 ]/g, '');
    let res = str.replace(/(\s|　|”|“){1,}|<br>|<p>|<\/p>/g, "");
    res = res.replace(/\(.+\)/g, "");
    return res;
  }

  // 分句
  splitSentence(content) {
    if (!content) {
      return [];
    }
    let str = this.formatStr(content);
    str = str.replace(/！|。|？|；/g, s => `${s}|`);
    str = str.replace(/\|$/g, "");
    let arr = str.split("|");
    arr = arr.filter(item => item.length >= 2);
    return arr;
  }

  // 清除标点符号
  cleanPunctuation(str) {
    const puncReg = /[<>《》！*\(\^\)\$%~!@#…&%￥—\+=、。，？；‘’“”：·`]/g;
    return str.replace(puncReg, "");
  }

  // 过滤敏感词
  cleanBadChar(str) {
    const badChars = "胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱".split(
      "",
    );
    return str
      .split("")
      .filter(char => badChars.indexOf(char) === -1)
      .join("");
  }

  // 生成名字
  genName() {
    if (!this.book) {
      return null;
    } else {
      // this.loadBook(this.book);
    }
    // const len = this.book.length;
    try {
      const passage = rand.choose(this.book);
      const { content, title, author, book, dynasty } = passage;
      if (!content) {
        return null;
      }

      const sentenceArr = this.splitSentence(content);

      if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) {
        return null;
      }

      // if (Array.isArray(sentenceArr) && sentenceArr.length <= 0) {
      //   log({ passage, sentenceArr });
      // }

      const sentence = rand.choose(sentenceArr);

      const cleanSentence = this.cleanBadChar(this.cleanPunctuation(sentence));
      if (cleanSentence.length <= 2) {
        return null;
      }

      // log({ content, sentence });
      // const charList = this.cleanBadChar(cleanSentence);
      const name = this.getTwoChar(cleanSentence.split(""));
      const res = {
        name,
        sentence,
        content,
        title,
        author,
        book,
        dynasty,
      };
      return res;
    } catch (err) {
      throw Error(err);
    }

    // log('passage', passage);
  }

  // 取字
  getTwoChar(arr) {
    const len = arr.length;
    const first = rand.between(0, len);
    let second = rand.between(0, len);
    let cnt = 0;
    while (second === first) {
      second = rand.between(0, len);
      cnt++;
      if (cnt > 100) {
        break;
      }
    }
    return first <= second
      ? `${arr[first]}${arr[second]}`
      : `${arr[second]}${arr[first]}`;
  }
}
export default Namer;
