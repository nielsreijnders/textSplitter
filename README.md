# textSplitter  📖

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=%23000)](https://www.npmjs.com/package/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=%23000)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=%23000)](https://github.com)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=black&style=for-the-badge)](https://unpkg.com/textsplitter)

Tiny library to split each characters / words / lines 

##### Install

```js
npm install textsplitter --save
```

##### Usage

```js
import {splitLetters, splitWords, splitLines} from 'textsplitter';

//Openingtag & closingtag has to be a string
splitLetters(container, openingtag, closingtag);
splitWords(container, openingtag, closingtag);
splitLines(container, openingtag, closingtag);
```

##### Example

```js
wrapLines(document.getElementById("container"), "<span><thisiscoolhuh>", "</thisiscoolhuh></span>");
```
###### So you don't have to run the demo :p

![example.gif](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

##### Notice

> This library only breaks each line! You can add your own animations with by example css or gsap.

##### To dos

- [ ] resize option
- [x] option to also split words/characters

###### MIT © <a href="#?????portfolio_coming_soon">Niels Reijnders</a>
