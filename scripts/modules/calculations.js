define(function () {
    return {
        twoRandomNrOnSum: function (randConst, range) {
            const randomNumber = Math.floor(Math.random() * randConst),
                firstNr = range - randomNumber,
                secondNr = Math.floor(Math.random() * (range - firstNr));
                console.log(`Random ${randomNumber} First ${firstNr} Second ${secondNr}`);

            return { firstNr: firstNr, secondNr: secondNr }
        },
        twoRandomNrOnSubtract: function (randConst, range) {
            const randomNumber = Math.floor(Math.random() * randConst),
                firstNr = range - randomNumber,
                secondNr = Math.floor(Math.random() * (firstNr));
            return { firstNr: firstNr, secondNr: secondNr }
        }
    }
});


