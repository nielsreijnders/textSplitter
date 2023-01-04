# TextSplitter 🔪

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://www.npmjs.com/package/textsplitter)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=ACC7C3&label=GZIP%20SIZE&style=for-the-badge)](https://unpkg.com/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com)

Tiny library to split each characters, words or lines! New feature for splitlines function to preserve HTML tags.

#### Install

```js
npm install textsplitter --save
```

#### Usage

```js
import { splitLetters, splitWords, splitLines } from 'textsplitter';

// HTML ELEMENT, STRING, STRING
splitLetters(container, openingtag, closingtag);

// HTML ELEMENT, STRING, STRING
splitWords(container, openingtag, closingtag);

// HTML ELEMENT, STRING, STRING
splitLines(container, openingtag, closingtag);

// React usage
useEffect(() => {
  // It is not specific made for React but it works fine
  splitLines(ref.current, openingtag, closingtag);

  // If not calulating correctly this might be an issue with the fonts which are not ready yet 
  document.fonts.ready.then(() => {
    splitLines(ref.current, openingtag, closingtag);
  });

  // When running React in strict mode you might want to add an if statement to check if the function already fired
  if (!ref.current.querySelector('.lines')) {
    splitLines(ref.current, '<span class="lines">', '</span>');
  }
}, [])
```

#### Example

```js
splitLines(document.getElementById("container"), "<span><thisiscoolhuh>", "</thisiscoolhuh></span>");
```
#### Output

![example.gif](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

#### MIT © <a href="nielsreijnders.nl">Niels Reijnders</a>
