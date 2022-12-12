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
  const array: any = []
  container.querySelectorAll('n').forEach((node) => {
    const { y } = node.getBoundingClientRect()

    if (y > lastY) {
      lastY = y
      array.push(`${closingtag}${opentag}${node.innerHTML}`)
    } else {
      array.push(node.innerHTML)
    }
  })

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  container.innerHTML = `${array.join(' ')}${closingtag}`

  return container
}

export function richtextSplitLines (container: HTMLElement, opentag: string, closingtag: string, customClass?: string): HTMLElement {
  splitWords(container, `${opentag}<n>`, `</n>${closingtag}`)

  let lastY = -9999
  let count = 0

  container.querySelectorAll('n').forEach((node) => {
    const { y } = node.getBoundingClientRect()

    console.log(node, y)

    if (y > lastY) {
      count += 1
      lastY = y
    }

    node.outerHTML = `<span class="${customClass ?? ''}line-${count}">${node.innerHTML}</span>`
  })

  return container
}
