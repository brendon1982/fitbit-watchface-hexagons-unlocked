export default function copyProperties(destination, source) {
    for (const prop in source) {
        if (source.hasOwnProperty(prop)) {
            destination[prop] = source[prop];
        }
    }

    return destination;
}