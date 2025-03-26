const date = new Date(Date.now());

const month = () => {
    const monthString = (date.getMonth() + 1).toString();

    if (monthString.length == 1) {
        return '0' + monthString;
    }

    return monthString;
}

const day = () => {
    const dayString = (date.getDate()).toString();

    if (dayString.length == 1) {
        return '0' + dayString;
    }

    return dayString;
}

const year = (date.getFullYear()).toString();

const urlDate = `_${month()}_${day()}_${year}`;

console.log(urlDate);

console.log(__dirname);