/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export function splitLetters (container: HTMLElement, opentag: string, closingtag: string): HTMLElement {
  const html: string[] = [...container.innerHTML.match(/<[^>]+>/g)!, '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += (string.replace(/\S/g, opentag + '$&' + closingtag) + html[index])
  })

  container.innerHTML = tmp

  return container
}

export function splitWords (container: HTMLElement, opentag: string, closingtag: string): HTMLElement {
  const html: string[] = [...container.innerHTML?.match(/<[^>]+>/g)!, '']
  let tmp = ''

  container.innerHTML.split(/<[^>]+>/g)?.forEach((string, index) => {
    tmp += string.replace(/\S+/g, opentag + '$&' + closingtag) + html[index]
  })

  container.innerHTML = tmp

  return container
}

function sanitizeString (str: string): string {
  return str.replace(/[^a-z0-9áéíóúñü .,_-]/gim, '').trim().replace(/\s+/g, ' ')
}

export function splitLines (container: HTMLElement, opentag: string, closingtag: string): HTMLElement {
  const htmlTags = [...container.innerHTML.match(/<[^>]+>/g)! || '', '', '']
  const containerSplit = container.innerHTML.split(/<[^>]+>/g)
  const htmlClosingTags = [...container.innerHTML.match(/<[^>]+>/g)! || '']
  const whiteSpaces = [...container.textContent!.match(/\S+/g)!]

  splitWords(container, '<n>', '</n>')

  const spans = container.querySelectorAll('n')
  const tops: Array<{top: number, text: string}> = []
  const splitPostionsTops: number[] = [0]

  spans.forEach(span => {
    const { top } = span.getBoundingClientRect()
    tops.push({ top, text: span.textContent as string })
  })

  let finalString = ''
  let lastTop = 0
  let count = 0
  let htmlOpenTag = false
  const htmlLineTags: string[][] = []
  let htmlCount = -1

  containerSplit.forEach((_string, i) => {
    if (htmlTags[i].includes('/') && !htmlTags[i + 1].includes('/')) {
      htmlLineTags.push(htmlClosingTags.slice(0, i + 1))
      htmlClosingTags.splice(0, i + 1)
    }
  })

  containerSplit?.forEach((string, i) => {
    const SANITIZED_STRING = sanitizeString(string)
    const { length } = SANITIZED_STRING.split(' ')

    if (string.length > 0) {
      splitPostionsTops.push(splitPostionsTops[i] + length)

      const splicedTops = tops.slice(splitPostionsTops[i], splitPostionsTops[i] + length)

      splicedTops.forEach(({ top, text }) => {
        let whitespace = ''
        if (lastTop < top || lastTop > top) {
          if (htmlOpenTag) {
            const half = Math.ceil(htmlLineTags[htmlCount].length / 2)
            const openingTags = htmlLineTags[htmlCount].slice(0, half)
            const closingTags = htmlLineTags[htmlCount].slice(half)
            finalString += closingTags.join('') + closingtag + opentag + openingTags.join('')
          } else finalString += closingtag + opentag
        };

        // Whitespace is still an issue
        if ((whiteSpaces[count].length > 0) && whiteSpaces[count].includes(text)) whitespace = ' '
        else whiteSpaces.splice(0, 0, ' ')

        finalString += text + whitespace
        count += 1
        lastTop = top
      })

      // If string is empty pass the current splitPosition and add the html tag
    } else splitPostionsTops.push(splitPostionsTops[i])

    if (!htmlTags[i].includes('/') && htmlTags[i + 1].includes('/')) {
      htmlCount = htmlCount + 1
      htmlOpenTag = true
    } else htmlOpenTag = false

    finalString += htmlTags[i]
  })

  container.innerHTML = finalString += closingtag

  return container
}
