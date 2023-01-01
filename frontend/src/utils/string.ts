export function spliceString(str: string, index: number, count: number, add: string) {
    if (index < 0) {
        index = str.length + index;
        if (index < 0) {
            index = 0;
        }
    }

    return str.slice(0, index) + (add || "") + str.slice(index + count);
}

export function splitString(string: string): number {
    let temp = string.split(':');
    
    return (parseInt(temp[0] + temp[1]));
}