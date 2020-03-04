require(["modules/nav", 'modules/audio'], function (nav, audio) {
    nav.navigation(document.body);
    "use strict";
    let context = document.getElementById('sheet').getContext("2d"),
        canvas = document.getElementById('sheet'),
        btnClearCanavs = $("#btnClearCanvas"),
        btnKirjutaIseTaht = $("#btnKirjutaIseTaht"),
        btnKirjatahed = $("#btnKirjatahed"),
        btnTrukitahed = $("#btnTrukitahed"),
        letter = $("#letters"),
        letterCase = "upper",
        canvasLetter = "",
        clickX = [],
        clickY = [],
        clickDrag = [],
        paint;


    context = canvas.getContext("2d");
    context.strokeStyle = "#17a2b8";
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.lineColor = "#17a2b8";

    btnKirjatahed.on("click", function () {
        letter.each(function () {
            $(this).css({ "text-transform": "lowercase" });
        });
        letterCase = "";
        audio.src = 'audio/titles/kirjatahed.wav'
        audio.playAudio.play(audio.src);
    });

    btnTrukitahed.on("click", function () {
        letter.each(function () {
            $(this).css({ "text-transform": "uppercase" });
        });
        letterCase = "upper";
        audio.src = 'audio/titles/trukitahed.wav'
        audio.playAudio.play(audio.src);
    });

    btnKirjutaIseTaht.on("click", function () {
        audio.src = 'audio/titles/kirjuta_ise_taht.wav'
        audio.playAudio.play(audio.src);
    });

    letter.on("click", function (e) {
        addLetterToCanvas($(e.target).data("letter"), letterCase);
        canvasLetter = $(e.target).data("letter");
    });

    btnClearCanavs.on("click", function () {
        addLetterToCanvas(canvasLetter);
        audio.src = 'audio/titles/proovi_uuesti.wav'
        audio.playAudio.play(audio.src);
    });

    function addLetterToCanvas(letter, letterCase) {
        if (letter != undefined) {
            context.fillStyle = "white";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = "100px Arial";
            context.fillStyle = "grey";
            context.textAlign = "center";
            if (letterCase != "upper") {
                context.fillText(letter, canvas.width / 2, canvas.height / 1.5);
            }
            else {
                context.fillText(letter.toLocaleUpperCase(), canvas.width / 2, canvas.height / 1.5);
            }
        }
    }

    /**
     * Add information where the user clicked at.
     * @param {number} x
     * @param {number} y
     * @return {boolean} dragging
     */
    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    /**
     * Redraw the complete canvas.
     */
    function redraw() {
        // Clears the canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < clickX.length; i += 1) {
            if (!clickDrag[i] && i == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else if (!clickDrag[i] && i > 0) {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.lineTo(clickX[i], clickY[i]);
                context.stroke();
            }
        }
    }

    /**
     * Draw the newly added point.
     * @return {void}
     */
    function drawNew() {
        var i = clickX.length - 1
        if (!clickDrag[i]) {
            if (clickX.length == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            }
        } else {
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
    }

    function mouseDownEventHandler(e) {
        paint = true;
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, false);
            drawNew();
        }
    }

    function touchstartEventHandler(e) {
        paint = true;
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
            drawNew();
        }
    }

    function mouseUpEventHandler(e) {
        context.closePath();
        paint = false;
    }

    function mouseMoveEventHandler(e) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, true);
            drawNew();
        }
    }

    function touchMoveEventHandler(e) {
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
            drawNew();
        }
    }

    function setUpHandler(isMouseandNotTouch, detectEvent) {
        removeRaceHandlers();
        if (isMouseandNotTouch) {
            canvas.addEventListener('mouseup', mouseUpEventHandler);
            canvas.addEventListener('mousemove', mouseMoveEventHandler);
            canvas.addEventListener('mousedown', mouseDownEventHandler);
            mouseDownEventHandler(detectEvent);
        } else {
            canvas.addEventListener('touchstart', touchstartEventHandler);
            canvas.addEventListener('touchmove', touchMoveEventHandler);
            canvas.addEventListener('touchend', mouseUpEventHandler);
            touchstartEventHandler(detectEvent);
        }
    }

    function mouseWins(e) {
        setUpHandler(true, e);
    }

    function touchWins(e) {
        setUpHandler(false, e);
    }

    function removeRaceHandlers() {
        canvas.removeEventListener('mousedown', mouseWins);
        canvas.removeEventListener('touchstart', touchWins);
    }

    canvas.addEventListener('mousedown', mouseWins);
    canvas.addEventListener('touchstart', touchWins);
});