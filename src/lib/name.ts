import random from "./random";

// @ts-ignore
// import books from "../assets/json/books/*.json";
// const books = require("../assets/json/books/*.json");
import books from "../assets/json/books";

// console.log(JSON.stringify(books));

// console.log(bks);

class Name {
  getBooks({ tag } = { tag: "" }): any {
    return books.filter((item: any) => (tag ? item.tag === tag : true));
  }

  // 拆分诗句
  splitSentence(content: string) {
    if (!content) {
      return [];
    }
    return content
      .replace(/(\s|　|”|“){1,}|<br>|<p>|<\/p>/g, "")
      .replace(/\(.+\)/g, "")
      .replace(/！|。|？|；/g, s => `${s}|`)
      .replace(/\|$/g, "")
      .split("|")
      .filter(item => item.length >= 8);
  }

  // 数据清洗
  cleanData(str: string) {
    // 标点符号
    const badChars =
      "胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱";
    const badCharsReg = `/${badChars.split("").join("|")}/g`;
    const punctuationReg = /[<>《》！*(^)$%~!@#…&%￥—+=、。，？；‘’“”：·`]/g;
    return str.replace(punctuationReg, "").replace(badCharsReg, "");
  }

  // 生成名字
  generate() {
    const bookList = this.getBooks();
    if (!bookList) {
      return null;
    }
    try {
      const passage = random.choice(bookList);
      const { content, title, author, tag, dynasty } = passage;
      if (!content) {
        return null;
      }

      const sentenceArr = this.splitSentence(content);

      if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) {
        return null;
      }

      const sentence = random.choice(sentenceArr);

      // const cleanSentence = this.cleanBadChar(this.cleanPunctuation(sentence));
      const cleanSentence = this.cleanData(sentence);
      if (cleanSentence.length <= 2) {
        return null;
      }

      const name = this.getName(cleanSentence.split(""));
      const res = {
        name,
        sentence,
        content,
        title,
        author,
        tag,
        dynasty,
      };
      return res;
    } catch (err) {
      throw Error(err);
    }
  }

  // 取字
  getName(arr: Array<any>) {
    const len = arr.length;
    const first = random.int(0, len);
    let second = random.int(0, len);
    let cnt = 0;
    while (second === first) {
      second = random.int(0, len);
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
export default Name;
