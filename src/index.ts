export function splitLetters(container: HTMLElement, opentag: string, closingtag: string) {
    let tmp = '';

    const html = [...container.innerHTML!.match(/<[^>]+>/g)! || '', ''];

    container.innerHTML!.split(/<[^>]+>/g)?.forEach((string, index) => {
        return tmp += (string.replace(/\S/g, opentag + "$&" + closingtag) + html![index]);
    });

    container.innerHTML = tmp;
}

export function splitWords(container: HTMLElement, opentag: string, closingtag: string) {
    let tmp = '';

    const html = [...container.innerHTML!.match(/<[^>]+>/g)! || '', ''];
    container.innerHTML!.split(/<[^>]+>/g)?.forEach((string, index) => {
        return tmp += (string.replace(/\S+/g, opentag + "$&" + closingtag) + html![index]);
    });

    container.innerHTML = tmp;
}

export function splitLines(container: HTMLElement, opentag: string, closingtag: string) {
    splitWords(container, '<n>', '</n>');

    var // Todo: split lines on each n tag to prevent a html tag which is longer than the line length
        // spans = container.querySelectorAll('n'),
        htmlTags = container.children,
        whiteSpace = container.innerHTML,
        top = 0,
        tmp = '';


    for (let i = 0; i < htmlTags.length; i++) {
        var rect = Math.abs(htmlTags[i].getBoundingClientRect().top);
        if (top < rect || top > rect) tmp += closingtag + opentag;
        top = rect;

        // if (!htmlTags[i]) return null;

        const replacedHtmlTags = htmlTags[i].outerHTML.toString();

        // console.log(replacedHtmlTags.split(/<[n^\/>]+>/g).join(''));

        tmp += replacedHtmlTags.split(/<[n^\/>]+>/g).join('') + (whiteSpace.includes(replacedHtmlTags + ' ') ? ' ' : '');
    }

    // console.log(tmp);

    container.innerHTML = tmp += closingtag;
}