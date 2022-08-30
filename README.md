# TextSplitter 🥭

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://www.npmjs.com/package/textsplitter)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=ACC7C3&label=GZIP%20SIZE&style=for-the-badge)](https://unpkg.com/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com)

Tiny library to split each characters, words or lines! 

##### Install

```js
npm install textsplitter --save
```

##### Usage

```js
import {splitLetters, splitWords, splitLines} from 'textsplitter';

//Openingtag & closingtag has to be a string
splitLetters(container, openingtag, closingtag);

//It is pretty simple so..
splitWords(container, openingtag, closingtag);

//So I don't really need a documentation right?
splitLines(container, openingtag, closingtag);

// React usage
useEffect(() => {
  // It is not specific made for React but obv it works fine
  splitLines(ref.current, openingtag, closingtag);
}, [])

```

##### Example

```js
splitLines(document.getElementById("container"), "<span><thisiscoolhuh>", "</thisiscoolhuh></span>");
```
###### output

![example.gif](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

##### Notice

> This library only breaks each line / word or letter! You can add your own animations with by example css or gsap.

###### MIT © <a href="#?????portfolio_coming_soon">Niels Reijnders</a>
