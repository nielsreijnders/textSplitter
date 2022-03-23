export function splitLetters(container, opentag, closingtag) {
    container.innerHTML = container.textContent.replace(/\S/g, opentag + "$&" + closingtag);
}

export function splitWords(container, opentag, closingtag) {
    container.innerHTML = container.textContent.replace(/\S+/g, opentag + "$&" + closingtag);
}

export function splitLines(container, opentag, closingtag) {
    var spans = container.children,
        top = 0,
        tmp = '';

    container.innerHTML = container.innerHTML.replace(/\S+/g, '<n>$&</n>');

    for (let i = 0; i < spans.length; i++) {
        var rect = spans[i].getBoundingClientRect().top;
        if (top < rect) tmp += closingtag + opentag;
        top = rect;
        tmp += spans[i].textContent + ' ';
    }

    container.innerHTML = tmp += closingtag;
}

export default { splitLetters, splitLines, splitWords }