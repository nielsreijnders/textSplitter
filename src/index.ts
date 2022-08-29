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

function sanitizeString(str){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim().replace(/\s+/g, ' ');
}

export function splitLines(container: HTMLElement, opentag: string, closingtag: string) {
    const htmlTags = [...container.innerHTML!.match(/<[^>]+>/g)! || '', ''];
    const containerSplit = container.innerHTML!.split(/<[^>]+>/g);
    
    const whiteSpaces = [...container.textContent!.match(/\S+/g)!];

    splitWords(container, '<n>', '</n>');

    const spans = container.querySelectorAll('n');
    const tops: number[] = [];
    const splitPostionsTops: number[] = [0];
    const words: string[] = [];
    let finalString = '';

    spans.forEach(span => {
        const { top } = span.getBoundingClientRect();
        tops.push(top);
        words.push(span.textContent as string);
    });
    
    let lastTop = 0;
    let count = 0;
    
    containerSplit?.forEach((string, i) => {
        const sanitized_string = sanitizeString(string);
        const { length } = sanitized_string.split(' ');
        splitPostionsTops.push(splitPostionsTops[i] + length);

        const splicedTops = tops.slice(splitPostionsTops[i], splitPostionsTops[i] + length);
        
        splicedTops.forEach((top) => {
            let whitespace = '';
            if (lastTop < top || lastTop > top) finalString += closingtag + opentag;

            if(whiteSpaces[count] && whiteSpaces[count].includes(words[count])) whitespace = ' ' 
            else whiteSpaces.splice(0, 0, ' ');

            finalString += whitespace + words[count];
            count += 1;
            lastTop = top;
        });
    
        finalString += htmlTags[i];
    });

    container.innerHTML = finalString += closingtag;
}