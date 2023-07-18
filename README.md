# TextSplitter 🔪

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://www.npmjs.com/package/textsplitter)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=ACC7C3&label=GZIP%20SIZE&style=for-the-badge)](https://unpkg.com/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com)

## Description

TextSplitter is a lightweight library designed to split text into individual characters, words, or lines. It also includes a new feature to preserve HTML tags when using the splitLines function.

## Installation

You can install TextSplitter using npm or yarn:

```bash
npm install textsplitter --save
```
or
```bash
yarn add textsplitter
```

## Usage

Import the required functions from 'textsplitter':

```javascript
import { splitLetters, splitWords, splitLines } from 'textsplitter';
```

Use the following functions according to your requirements:

- `splitLetters(container, openingtag, closingtag)`: Splits individual characters.
- `splitWords(container, openingtag, closingtag)`: Splits words.
- `splitLines(container, openingtag, closingtag)`: Splits lines while preserving HTML tags.

React usage example:

```javascript
useEffect(() => {
  const lines = splitLines(ref.current, openingtag, closingtag);

  // If not calculating correctly, this might be an issue with fonts that are not ready yet
  document.fonts.ready.then(() => {
    splitLines(ref.current, openingtag, closingtag);
  });

  return () => {
    // Destroy lines (return to its initial state)
    lines.destroy();
  };
}, []);
```

## Example

```javascript
splitLines(document.getElementById("container"), "<span><thisiscoolhuh>", "</thisiscoolhuh></span>");
```

## Output

![example.gif](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

## License

MIT © [Niels Reijnders](https://www.bemeant.com)

---

*If you're looking for a lightweight library to split text into characters, words, or lines while preserving HTML tags, TextSplitter is the right choice! Easily integrate it into your projects using npm or yarn.*