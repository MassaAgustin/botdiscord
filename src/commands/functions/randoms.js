const textImages = require('../../constants/imageText');

const getImageTextRandom = () => {

    const imagesLength = textImages.length;

    const random = (Math.round(Math.random() * imagesLength))
    return textImages[random];
}

const getImageTextById = (id) => {

    const imagesLength = textImages.length;
    if (id >= 0 && id < imagesLength) {
        return textImages[id]
    }
    return "No existe s fasilito";
}

const getStringNumberIcon = (charCode) => {

    const stringNumber = {
        48: 'zero',
        49: 'one',
        50: 'two',
        51: 'three',
        52: 'four',
        53: 'five',
        54: 'six',
        55: 'seven',
        56: 'eight',
        57: 'nine',
    }

    return stringNumber[charCode];
}

const getCurrentIcon = (charCode, char) => {

    if (charCode == 33) return ':exclamation:';
    if (charCode == 63) return ':question:';

    if (charCode >= 97 && charCode <= 122) {
        if (charCode == 97) return `:${char}:`;
        if (charCode == 98) return `:${char}:`;
        if (charCode == 111) return `:${char}2:`
        return `:regional_indicator_${char}:`;
    }

    if (charCode >= 48 && charCode <= 57) {
        return `:${getStringNumberIcon(charCode)}:`
    }

    return char;
}

module.exports = {
    getImageTextRandom,
    getImageTextById,
    getCurrentIcon
}