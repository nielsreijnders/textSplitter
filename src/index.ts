/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const resetContainer = (container: HTMLElement): (() => void) => {
  const oldHTML = container.innerHTML

  const reset = (): void => {
    (container.innerHTML) = oldHTML
  }

  return reset
}

export function splitLetters (container: HTMLElement, opentag: string, closingtag: string): ({ container: HTMLElement, destroy: () => any }) {
  const destroy = resetContainer(container)

  const html: string[] = [...container.innerHTML.match(/<[^>]+>/g)! || '', '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += (string.replace(/\S/g, opentag + '$&' + closingtag) + html[index])
  })

  container.innerHTML = tmp

  return ({ container, destroy })
}

function splitWordsHelper (container: HTMLElement, opentag: string, closingtag: string): ({ container: HTMLElement, destroy: () => any }) {
  const destroy = resetContainer(container)

  const html: string[] = [...container.innerHTML?.match(/<[^>]+>/g)! || '', '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += string.replace(/((\w+|-)|(\S))/g, opentag + '$1' + closingtag) + html[index]
  })

  container.innerHTML = tmp

  return ({ container, destroy })
}

export function splitWords (container: HTMLElement, opentag: string, closingtag: string): ({ container: HTMLElement, destroy: () => any }) {
  const destroy = resetContainer(container)

  splitWordsHelper(container, '<n>', '</n>')

  const allElements = container.querySelectorAll('n')

  allElements.forEach((node, index) => {
    if (node.innerHTML.length === 1 && !node.innerHTML.match(/[.,?/#!$%^&*;:{}=\-_`~()]/g)) {
      const firstWord = allElements[(index || 1) - 1]
      const secondWord = allElements[index + 1]
      const { y: firstY } = firstWord.getBoundingClientRect()
      const { y: secondY } = secondWord.getBoundingClientRect()

      if (firstY === secondY) {
        if (!node.innerHTML.match(/[^\w\u00AD]/g)) {
          allElements[index].innerHTML = `${firstWord.innerHTML}${node.innerHTML}${secondWord.innerHTML}`
          firstWord.remove()
          secondWord.remove()
        }
      } else if (!node.innerHTML.match(/[^\w\u00AD]/g)) {
        allElements[index].innerHTML = '-'
      }
    }
  })

  container.innerHTML = container.innerHTML.replace(/<n>/g, opentag).replace(/<\/n>/g, closingtag)

  return ({ container, destroy })
}

export function splitLines (container: HTMLElement, opentag: string, closingtag: string): ({ container: HTMLElement, destroy: () => any }) {
  const destroy = resetContainer(container)

  splitWords(container, '<n>', '</n>')

  let lastY = -9999

  container.querySelectorAll('n').forEach((node) => {
    const { y } = node.getBoundingClientRect()

    if (y > lastY) {
      lastY = y
      node.outerHTML = `<line>${node.innerHTML}</line>`

      return
    }

    node.outerHTML = `${node.innerHTML}`
  })

  let output = ''
  let index = 0

  // Array for storing opening tags for the next line
  const nextLineOpeningTags: any = []
  const nextLineClosingTags: any = [];

  // Loop through each line
  // Because it is possible that the FIRST line tag is not at the beginning of the string it might not get the correct opening tags
  // To solve this issue remove the first line tag and add it at the beginning of the string
  (`<line>${container.innerHTML.trim().replace('<line>', '')}`).split('<line>').forEach((str) => {
    if (!str) return

    // Remove closing tag from the end of the line
    const string = str.replace('</line>', '')

    // console.log(string)

    // Get opening tags from the current line
    // ALSO SKIP ALL BR TAGS
    const openingtags: string[] = string.match(/<(?!\/)(?!br)[^>]+>/g)! ?? []

    // Get closing tags from the current line
    const closingtags: string[] = string.match(/<\/[^>]+>/g)! ?? []

    // Get opening tags from the previous line if not exist return an empty array
    const openingTagsLastLine = nextLineOpeningTags[index - 1] ?? []

    // Get opening tags from the previous line if not exist return an empty array
    const closingTagsLastLine = nextLineClosingTags[index - 1] ?? []

    openingtags.push(...openingTagsLastLine)
    closingtags.push(...closingTagsLastLine)

    // Filter opening tags that are not closed
    const filteredOpeningTagsEndOfLine = openingtags.slice().splice(0, openingtags.length - closingtags.length).reverse()
    nextLineOpeningTags.push(filteredOpeningTagsEndOfLine)

    const refactoredLine = `${opentag}${openingTagsLastLine.join('')}${string}${filteredOpeningTagsEndOfLine.slice().reverse().map(tag => tag.replace('<', '</')).join('')}${closingtag}`

    output += refactoredLine
    index += 1
  })

  container.innerHTML = output

  return ({ container, destroy })
}
