# TextSplitter 🦚

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=%23BFB1B2)](https://www.npmjs.com/package/textsplitter)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=%23BFB1B2&label=GZIP%20SIZE&style=for-the-badge)](https://unpkg.com/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=%23BFB1B2)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=%23BFB1B2)](https://github.com)

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
```

##### Example

```js
splitLines(document.getElementById("container"), "<span><thisiscoolhuh>", "</thisiscoolhuh></span>");
```
###### output

![example.gif](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

##### Notice

> This library only breaks each line / word or letter! You can add your own animations with by example css or gsap.

##### To dos

- [ ] resize option
- [x] option to also split words/characters

###### MIT © <a href="#?????portfolio_coming_soon">Niels Reijnders</a>
