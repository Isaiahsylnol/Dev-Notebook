export class StringHelper {
    static upperCase(text: string) {
      if (text) {
        return text.toUpperCase();
      }
    }
    static reverse(text: string) {
      let str = '';
      for (let i = text.length-1; i >=0; i--) {
        //console.log(text[i]);
        str += text[i]
      }
      return str;
    }
    // Using built-in methods
   /* static reverse(text: string): string {
      return text.split('').reverse().join('');
    }*/
  }
  