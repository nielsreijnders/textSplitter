# TextSplitter 🔪

[![npm version](https://img.shields.io/npm/v/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://www.npmjs.com/package/textsplitter)
[![gzip size](https://img.shields.io/bundlephobia/minzip/textsplitter.svg?colorB=ACC7C3&label=GZIP%20SIZE&style=for-the-badge)](https://unpkg.com/textsplitter)
[![license](https://img.shields.io/npm/l/textsplitter.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com/nielsreijnders/textsplitter/blob/master/LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-none-ff69b4.svg?style=for-the-badge&colorB=ACC7C3)](https://github.com)

**TextSplitter** is a lightweight JavaScript library designed to split text into individual characters, words, or lines. It also offers a feature to preserve HTML tags when using the `splitLines` function, making it ideal for text animations and advanced styling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Functions](#functions)
  - [Examples](#examples)
    - [Basic Usage](#basic-usage)
    - [React Example](#react-example)
- [Output](#output)
- [License](#license)

## Features

- **Split into Characters**: Break down text into individual letters.
- **Split into Words**: Divide text into words for word-level manipulation.
- **Split into Lines**: Separate text into lines while preserving HTML tags.
- **No Dependencies**: Zero dependencies for easy integration.
- **Lightweight**: Minimal footprint for optimal performance.

## Installation

Install TextSplitter using npm or yarn:

```bash
npm install textsplitter
```

or

```bash
yarn add textsplitter
```

## Usage

Import the required functions from `textsplitter`:

```javascript
import { splitLetters, splitWords, splitLines } from 'textsplitter';
```

### Functions

- **`splitLetters(container, openingTag = '', closingTag = '')`**
  - Splits text into individual characters.
- **`splitWords(container, openingTag = '', closingTag = '')`**
  - Splits text into words.
- **`splitLines(container, openingTag = '', closingTag = '')`**
  - Splits text into lines while preserving HTML tags.

**Parameters:**

- `container` (required): The DOM element containing the text to split.
- `openingTag` (required): HTML tag or string to wrap before each split element (e.g., `'<span>'`).
- `closingTag` (required): HTML tag or string to wrap after each split element (e.g., `'</span>'`).

### Examples

#### Basic Usage

Split text into letters:

```javascript
const container = document.getElementById('text-container');
splitLetters(container, '<span class="letter">', '</span>');
```

Split text into words:

```javascript
splitWords(container, '<span class="word">', '</span>');
```

Split text into lines while preserving HTML tags:

```javascript
splitLines(container, '<div class="line">', '</div>');
```

#### React Example

```jsx
import { useEffect, useRef } from 'react';
import { splitLines } from 'textsplitter';

const TextComponent = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const lines = splitLines(textRef.current, '<span class="line">', '</span>');

    return () => {
      lines.destroy();
    };
  }, []);

  return (
    <div ref={textRef}>
      Your text content goes here.
    </div>
  );
};

export default TextComponent;
```

## Output

When using `splitLines`, your text will be wrapped in the specified tags per line:

```html
<div class="line">First line of text</div>
<div class="line">Second line of text</div>
```

![TextSplitter Output Example](https://media.giphy.com/media/jxchZz0EDhQ7QmYEwD/giphy.gif)

*An example of text split into lines and animated individually.*

## License

MIT © [Niels Reijnders](https://www.bemeant.com)

---

*Looking for a lightweight library to split text into characters, words, or lines while preserving HTML tags? TextSplitter is the right choice! Easily integrate it into your projects using npm or yarn and enhance your text animations today.*