define(['jquery', 'bootstrap'], function ($) {
    return {
        carousel: function (parent) {
            $(parent).append(`
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block" src="images/5733763.png" alt="First slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" src="images/7V5.gif" alt="Third slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" src="images/pencil_PNG3855.png" alt="Third slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" src="images/listen-cartoon-png-1.png" alt="Second slide">
                        </div>
                        <div class="carousel-item">
                            <img class="d-block" src="images/colored-letters-png-3-transparent.png" alt="Third slide">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            `);

            $('#carouselExampleControls').carousel({
                interval: 2500
            });
        }
    }
});


