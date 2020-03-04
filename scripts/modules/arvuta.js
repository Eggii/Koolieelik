require(["modules/nav",
    'modules/audio',
    "calculations"], function (nav, audio, calculations) {
        nav.navigation(document.body);

        const mathOperation = $("#mathOperation"),
            btnSum = $("#btnSum"),
            btnSubtract = $("#btnSub"),
            firstInput = $("#firstInput"),
            actionSign = $("#actionSign"),
            secondInput = $("#secondInput"),
            equalsSign = $("#equals"),
            inpLetter = $("#inpLetter"),
            btnVastusImg = $("#btnVastusImg"),
            numbers = $("span.number"),
            btnVastus = $("#btnVastus"),
            range = 10,
            randConst = 11;

        btnSum.on("click", function () {
            audio.src = "audio/titles/liida.wav";
            audio.playAudio.play(audio.src);

            mathOperation.removeClass("d-none");
            initializeMathOperation({
                actionSign: "+",
                audio: "plus"
            });

            inpLetter.focus();
        });

        btnSubtract.on("click", function () {
            audio.src = "audio/titles/lahuta.wav";
            audio.playAudio.play(audio.src);
            mathOperation.removeClass("d-none");
            initializeMathOperation({
                actionSign: "-",
                audio: "minus"
            });

            inpLetter.focus();
        });

        inpLetter.on("keyup", function (e) {
            let c1 = $(this).val().slice(0, 1);
            let c2 = $(this).val().slice(1, 2);
            let addImagesOnInput = function () {
                numbers.each(function (i) {
                    if (parseInt(inpLetter.val()) == i) {
                        $(this).siblings().clone().appendTo(btnVastusImg);
                    }
                });
            }
            if (e.key !== "Backspace" || e.key === "") {
                if ($.isNumeric(e.key)) {
                    validateInput();
                    btnVastus.removeClass("d-none");
                    btnVastusImg.html("");
                    addImagesOnInput();
                }
                if ($.isNumeric(c1)) {
                    if (!$.isNumeric(e.key)) {
                        $(this).val(c1)
                    }
                    if (c1 >= 1 && c2 > 0) {
                        $(this).val(c1);
                        addImagesOnInput();
                    }
                } else {
                    $(this).val("");
                }
            } else {
                btnVastusImg.html("?");
            }
        });

        numbers.each(function () {
            $(this).on("mousedown", function () {
                inpLetter.val($(this).attr("id"));

                btnVastusImg.html("");
                btnVastusImg.children('img').remove();
                btnVastusImg.append($(this).siblings().clone());

            });
            $(this).on("mouseup", function () {
                if (inpLetter.is(":visible")) {
                    validateInput();
                    btnVastus.removeClass("d-none");
                }
            });
        });

        firstInput.on("click", function () {
            audio.src = "audio/numbers/" + $(this).data("nr") + ".wav";
            audio.playAudio.play(audio.src);
        });

        actionSign.on("click", function () {
            audio.src = "audio/titles/" + $(this).data("audioName") + ".wav";
            audio.playAudio.play(audio.src);
        });

        secondInput.on("click", function () {
            audio.src = "audio/numbers/" + $(this).data("nr") + ".wav";
            audio.playAudio.play(audio.src);
        });

        equalsSign.on("click", function () {
            audio.src = "audio/titles/equals.wav";
            audio.playAudio.play(audio.src);
        });

        btnVastus.on("click", function () {
            if ($(this).text() == "VASTUS ON ÕIGE") {
                audio.src = 'audio/titles/vastus_on_oige.wav';
                audio.playAudio.play(audio.src);
            } else {
                audio.src = 'audio/titles/vastus_on_vale.wav';
                audio.playAudio.play(audio.src);
            }

        });

        btnVastusImg.on("click", function () {
            if ($(this).html() !== "?") {
                audio.src = "audio/numbers/" + inpLetter.val() + ".wav";
                audio.playAudio.play(audio.src);
            } else {
                audio.src = "audio/titles/palun_sisesta_number.wav";
                audio.playAudio.play(audio.src);
            }
        });

        function initializeMathOperation(params) {
            let firstNr;
            let secondNr;
            let randomSum = calculations.twoRandomNrOnSum(randConst, range);
            let randomSubtract = calculations.twoRandomNrOnSubtract(randConst, range);

            inpLetter.val("");
            btnVastusImg.html("?");
            if (params.actionSign === "+") {
                firstNr = randomSum.firstNr;
                secondNr = randomSum.secondNr;
            }
            if (params.actionSign === "-") {
                firstNr = randomSubtract.firstNr;
                secondNr = randomSubtract.secondNr;
            }

            firstInput.html(firstNr).data("nr", firstNr);
            secondInput.html(secondNr).data("nr", secondNr);
            actionSign.html(params.actionSign).data("audioName", params.audio);
            addInputImages({
                firstNr: firstNr,
                secondNr: secondNr
            });
            $("#mathOperation > div").css({ "justify-content": "center", "display": "flex", "font-size": "4em" });
        }

        function addInputImages(params) {
            let j = 0, k = 0;
            for (i = 0; i < 11; i++) {
                if (i <= 5 && j == params.firstNr) {
                    firstInput.append($("<img>", { "src": "images/fingers/" + i + ".png", "class": "h-1-5-em" }));
                }
                if (i > 5 && j == params.firstNr) {
                    j = 0;
                    firstInput.append($("<img>", { "src": "images/fingers/5.png", "class": "h-1-5-em" }));
                    firstInput.append($("<img>", { "src": "images/fingers/" + (i - 5) + ".png", "class": "h-1-5-em" }));
                }
                if (i <= 5 && k == params.secondNr) {
                    secondInput.append($("<img>", { "src": "images/fingers/" + i + ".png", "class": "h-1-5-em" }));
                }
                if (i > 5 && k == params.secondNr) {
                    k = 0;
                    secondInput.append($("<img>", { "src": "images/fingers/5.png", "class": "h-1-5-em" }));
                    secondInput.append($("<img>", { "src": "images/fingers/" + (i - 5) + ".png", "class": "h-1-5-em" }));
                }
                j++;
                k++;
            }
        }

        function validateInput() {
            if (inpLetter.val() == firstInput.data("nr") + secondInput.data("nr") && actionSign.text() == "+"
                || inpLetter.val() == firstInput.data("nr") - secondInput.data("nr") && actionSign.text() == "-") {
                btnVastus.show();
                btnVastus.text('VASTUS ON ÕIGE');
                btnVastus.append('<img src="images/smiley_PNG131.png" alt="Kuula"style="height: 2em; width: auto; display: inline-block; vertical-align: middle;"></img>');
                audio.src = 'audio/titles/vastus_on_oige.wav';
                audio.playAudio.play(audio.src);
            }
            else {
                btnVastus.show();
                btnVastus.text("VASTUS ON VALE");
                btnVastus.append('<img src="images/smiley_PNG175.png" alt="Kuula"style="height: 2em; width:auto display: inline-block; vertical-align: middle;"></img>');
                audio.src = 'audio/titles/vastus_on_vale.wav';
                audio.playAudio.play(audio.src);
            }
        }
    });