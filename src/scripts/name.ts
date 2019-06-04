import random from "./random";

// @ts-ignore
import books from "./json/*.json";

class Name {
  constructor() {}

  getBooks(): any {
    return Object.values(books).reduce((a: any, b: any) => [...a, ...b], []);
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

  // 清除标点符号
  cleanPunctuation(str: string) {
    const punctuationReg = /[<>《》！*\(\^\)\$%~!@#…&%￥—\+=、。，？；‘’“”：·`]/g;
    return str.replace(punctuationReg, "");
  }

  // 过滤敏感词
  cleanBadChar(str: string) {
    const badChars =
      "胸鬼懒禽鸟鸡我邪罪凶丑仇鼠蟋蟀淫秽妹狐鸡鸭蝇悔鱼肉苦犬吠窥血丧饥女搔父母昏狗蟊疾病痛死潦哀痒害蛇牲妇狸鹅穴畜烂兽靡爪氓劫鬣螽毛婚姻匪婆羞辱";
    return str
      .split("")
      .filter((char: string) => !badChars.includes(char))
      .join("");
  }

  // 数据清洗
  cleanData(str: string) {
    // 标点符号
    const punctuationReg = /[<>《》！*\(\^\)\$%~!@#…&%￥—\+=、。，？；‘’“”：·`]/g;
    return str.replace(punctuationReg, "");
  }

  // 生成名字
  generate() {
    const bookList = this.getBooks();
    if (!bookList) {
      return null;
    }
    try {
      const passage = random.choice(bookList);
      const { content, title, author, book, dynasty } = passage;
      if (!content) {
        return null;
      }

      const sentenceArr = this.splitSentence(content);

      if (!(Array.isArray(sentenceArr) && sentenceArr.length > 0)) {
        return null;
      }

      const sentence = random.choice(sentenceArr);

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
  getTwoChar(arr: Array<any>) {
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
