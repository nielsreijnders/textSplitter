export function splitLetters(container: HTMLElement, opentag: string, closingtag: string) {
    let tmp = '';

    const html = container.innerHTML!.match(/(?:<[^>]+>)/g) || [''];
    container.innerHTML!.split(/(?:<[^>]+>)/g)?.forEach((string, index) => {
        return tmp += (string.replace(/\S/g, opentag + "$&" + closingtag) + html![index]);
    });

    container.innerHTML = tmp;
}

export function splitWords(container: HTMLElement, opentag: string, closingtag: string) {
    let tmp = '';

    const html = container.innerHTML!.match(/(?:<[^>]+>)/g) || [''];
    container.innerHTML!.split(/(?:<[^>]+>)/g)?.forEach((string, index) => {
        return tmp += (string.replace(/\S+/g, opentag + "$&" + closingtag) + html![index]);
    });

    container.innerHTML = tmp;
}

export function splitLines(container: HTMLElement, opentag: string, closingtag: string) {
    var spans = container.children,
        top = 0,
        tmp = '';

    container.innerHTML = container.innerHTML.replace(/\S+/g, '<n>$&</n>');
    for (let i = 0; i < spans.length; i++) {
        var rect = Math.abs(spans[i].getBoundingClientRect().top);
        if (top < rect || top > rect) tmp += closingtag + opentag;
        top = rect;
        tmp += spans[i].innerHTML + ' ';
    }

    container.innerHTML = tmp += closingtag;
}