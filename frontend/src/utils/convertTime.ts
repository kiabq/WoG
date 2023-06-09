export function convertTime(timestr: string, miltime: boolean) {
    if (timestr === undefined) {
        return undefined;
    }

    var hours: number = parseInt(timestr.slice(0, 2));
    var minutes: number = parseInt(timestr.slice(3, 5));
    var meridian = 'AM';

    let fHours: number | string = hours;
    let fMinutes: number | string;

    fHours = fHours >= 10 ? fHours = hours : fHours = `0${fHours}`;
    fMinutes = minutes >= 10 ? fMinutes = minutes : fMinutes = `0${minutes}`;

    if (miltime === true) {
        return (`${fHours}:${fMinutes}`);
    } else {
        if (typeof hours !== 'number') {
            if (parseInt(hours) === 0) {
                hours = 12;
            }
        } else {
            hours = (hours + 11) % 12 + 1;
        }

        if ((fHours as number) > 11 && fHours !== 0) {
            meridian = 'PM';
        }

        return (`${hours}:${fMinutes} ${meridian}`);
    }
}