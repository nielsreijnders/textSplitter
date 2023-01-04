/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function splitLetters (container: HTMLElement, opentag: string, closingtag: string): HTMLElement {
  const html: string[] = [...container.innerHTML.match(/<[^>]+>/g)! || '', '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += (string.replace(/\S/g, opentag + '$&' + closingtag) + html[index])
  })

  container.innerHTML = tmp

  return container
}

export function splitWords (container: HTMLElement, opentag: string, closingtag: string): HTMLElement {
  const html: string[] = [...container.innerHTML?.match(/<[^>]+>/g)! || '', '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += string.replace(/\S+/g, opentag + '$&' + closingtag) + html[index]
  })

  container.innerHTML = tmp

  return container
}

export function splitLines (container: HTMLElement, opentag: string, closingtag: string, customClass?: string): HTMLElement {
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
  const nextLineOpeningTags: any = [];

  // Loop through each line
  // Because it is possible that the FIRST line tag is not at the beginning of the string it might not get the correct opening tags
  // To solve this issue remove the first line tag and add it at the beginning of the string
  (`<line>${container.innerHTML.trim().replace('<line>', '')}`).split('<line>').forEach((str) => {
    if (!str) return

    // Remove closing tag from the end of the line
    const string = str.replace('</line>', '')

    // Get opening tags from the current line
    // ALSO SKIP ALL BR TAGS
    const openingtags: string[] = string.match(/<(?!\/)(?!br)[^>]+>/g)! ?? []

    // Get closing tags from the current line
    const closingtags: string[] = string.match(/<\/[^>]+>/g)! ?? []

    // Get opening tags from the previous line if not exist return an empty array
    const openingTagsLastLine = nextLineOpeningTags[index - 1] ?? []

    // Filter opening tags that are not closed
    const filteredOpeningTagsEndOfLine = [...openingtags, ...openingTagsLastLine].slice().reverse().filter((_tag, index) => {
      if (!closingtags[index]) return true
      return false
    })

    // Get all filtered opening tags and replpace them to closing tags
    const filteredClosingTagsEndOfline = filteredOpeningTagsEndOfLine.map(tag => tag.replace('<', '</')).join('')

    // Set as string if possible
    const openingTagsLastLineToString = openingTagsLastLine ? openingTagsLastLine.slice().reverse().join('') : ''

    // Filter opening tags from the previous line that are not closed
    const filteredClosingTagsIfOpeningTagIsPresent = openingTagsLastLine && openingTagsLastLine.filter((_tag: any, index: number) => {
      if (!closingtags[index]) return true
      return false
    }).map((tag: any) => tag.replace('<', '</'))

    // Set as string if possible
    const filteredClosingTagsIfOpeningTagIsPresentToString = filteredClosingTagsIfOpeningTagIsPresent ? filteredClosingTagsIfOpeningTagIsPresent.join('') : ''

    // If there is a openingtag present without a closing tag push the opening tag from last line
    if (filteredClosingTagsIfOpeningTagIsPresentToString) {
      nextLineOpeningTags.push(openingTagsLastLine.splice(-filteredClosingTagsIfOpeningTagIsPresent.length))
    } else {
      // Otherwise push opening tags from the end line which will be used in the next line
      nextLineOpeningTags.push(filteredOpeningTagsEndOfLine)
    }

    const refactoredLine = `${opentag}${openingTagsLastLineToString}${string}${filteredClosingTagsEndOfline}${filteredClosingTagsIfOpeningTagIsPresentToString}${closingtag}`

    output += refactoredLine
    index += 1
  })

  container.innerHTML = output

  return container
}
