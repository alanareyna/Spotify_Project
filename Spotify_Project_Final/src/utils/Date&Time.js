
// Converts an amount in ms to a formatting string M:SS
const msToMins = (ms) => {

    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const seconds = Math.floor((ms / 1000) % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Formats a JS Date object to Month DD, YYYY
const formatDate = (date) => {
    return date.toLocaleString('en-US', {
        year : 'numeric',
        month : 'long',
        day : 'numeric'
    });
}

export {
    msToMins,
    formatDate
};
