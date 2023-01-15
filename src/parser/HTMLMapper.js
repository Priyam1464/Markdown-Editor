import { isOptionGroup } from "@mui/base";

export default class HtmlMapper {
  constructor(text) {
    this.text = text;
  }

  formatTextWithLinks(text) {
    let startBracketIndex = -1;
    let endBracketIndex = -1;
    let startLinkIndex = -1;
    let endLinkIndex = -1;
    let result = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "[") {
        startBracketIndex = i;
      } else if (text[i] === "]") {
        endBracketIndex = i;
      } else if (text[i] === "(") {
        startLinkIndex = i;
      } else if (text[i] === ")") {
        endLinkIndex = i;
        if (
          endBracketIndex - startBracketIndex > 1 &&
          startLinkIndex - endBracketIndex === 1 &&
          endLinkIndex - startLinkIndex > 1
        ) {
          result += `<a href='${text.substring(
            startLinkIndex + 1,
            endLinkIndex
          )}'>${text.substring(startBracketIndex + 1, endBracketIndex)}</a>`;
        }
        startBracketIndex = -1;
        endBracketIndex = -1;
        startLinkIndex = -1;
        endLinkIndex = -1;
      } else if (
        startBracketIndex === -1 &&
        endBracketIndex === -1 &&
        startLinkIndex === -1
      ) {
        result += text[i];
      }
    }
    return result;
  }

  formatInlineCode(text) {
    let result = "";
    let inlineStart = false;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === "`") {
        if (inlineStart === false) {
          inlineStart = true;
          result += `<span><b><xmp>`;
        } else {
          inlineStart = false;
          result += `</xmp></b></span>`;
        }
      } else {
        result += text[i];
      }
    }

    return result;
  }

  mapTextArrayToHtml() {
    let index = 0;
    let result = "";
    let list = null;
    let codeChrEncounterd = false;
    let code = "";
    console.log("text", this.text);
    for (let i = 0; i < this.text.length; i++) {
      const element = this.text[i];

      if (
        result.length > 0 &&
        list !== null &&
        ((list === "ordered" && isNaN(element[0]) && element[1] !== ".") ||
          (list === "unordered" && element[0] !== "-"))
      ) {
        result += list === "ordered" ? "</ol>" : "</ul>";
        list = null;
      }

      if (codeChrEncounterd) {
        console.log("Code");
        if (element.substring(element.length - 3, element.length) === "```") {
          result += `<div class="code"><xmp>${code}</xmp></div>`;
          codeChrEncounterd = false;
        } else {
          code += `${element}`;
        }
      } else if (element[0] === "#") {
        let index = 0;
        while (element[index] === "#") {
          index++;
        }

        if (element[index] !== " ") {
          result += `${element}`;
        } else {
          result += `<h${index}>${element.substring(index + 1)}</h${index}>`;
        }
      } else if (
        element.length > 4 &&
        element.substring(0, 2) ===
          element.substring(element.length - 2, element.length) &&
        element.substring(0, 2) === "**"
      ) {
        result += `<b>${element.substring(2, element.length - 2)}</b>`;
      } else if (
        element.length > 2 &&
        element[0] === "*" &&
        element[0] === element[element.length - 1]
      ) {
        result += `<em>${element.substring(1, element.length - 1)}</em>`;
      } else if (
        element.length > 2 &&
        element[0] === ">" &&
        element[1] === " "
      ) {
        result += `<blockquote class="block-quote"><h4 id="text">${this.formatTextWithLinks(
          element.substring(2, element.length)
        )}</h4></blockquote>`;
      } else if (element.length > 2 && element[0] === "-") {
        if (element[1] === " ") {
          if (
            result.substring(result.length - 3, result.length - 1) !== "li" &&
            list === null
          ) {
            list = "unordered";
            result += `<ul>`;
          }

          result += `<li>${element.substring(2, element.length)}</li>`;
        }
      } else if (
        element.length > 2 &&
        !isNaN(element[0]) &&
        element[1] === "."
      ) {
        if (
          result.substring(result.length - 3, result.length - 1) !== "li" &&
          list === null
        ) {
          list = "ordered";
          result += `<ol>`;
        }
        result += `<li>${element.substring(2, element.length)}</li>`;
      } else if (element.substring(0, 3) === "```") {
        if (
          element.length > 6 &&
          element.substring(element.length - 3, element.length) === "```"
        ) {
          result += `<div class="code"><xmp>${element.substring(
            1,
            element.length - 1
          )}</xmp></div>`;
        } else {
          codeChrEncounterd = true;
        }
      } else if (element.indexOf("[") !== -1 && element.indexOf("]") !== -1) {
        const startBracketIndex = element.indexOf("[");
        const endBracketIndex = element.indexOf("]");
        const startLinkIndex = element.indexOf("(");
        const endLinkIndex = element.indexOf(")");
        if (
          endBracketIndex - startBracketIndex > 1 &&
          startLinkIndex - endBracketIndex === 1 &&
          endLinkIndex > startLinkIndex > 1
        ) {
          result += `<a href='${element.substring(
            startLinkIndex + 1,
            endLinkIndex
          )}'>${element.substring(startBracketIndex + 1, endBracketIndex)}</a>`;
        } else {
          result += `${element}`;
        }
      } else if (element.substring(0, 3) === "---") {
        result += `<hr>`;
      } else {
        result += this.formatInlineCode(element);
      }
    }

    return result;
  }
}
