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

    var spans = container.querySelectorAll('n'),
        htmlTags = container.children,
        whiteSpace = container.innerHTML,
        top = 0,
        tmp = '';

    for (let i = 0; i < spans.length; i++) {
        var rect = Math.abs(spans[i].getBoundingClientRect().top);
        if (top < rect || top > rect) tmp += closingtag + opentag;
        top = rect;

        const replacedHtmlTags = htmlTags[i].outerHTML.toString();

        // Maybe better to use regex to replace the html tags since this might be a performance issue
        tmp += replacedHtmlTags.replace('<n>', '').replace('</n>', '') + (whiteSpace.includes(replacedHtmlTags + ' ') ? ' ' : '');
    }

    container.innerHTML = tmp += closingtag;
}