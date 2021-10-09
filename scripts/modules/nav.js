
define(['jquery'], function ($) {
    return {
        navigation: function (parent) {
            $(parent).prepend(`
                <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="index.html">KUULA JA ÕPI</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="trukitahed.html">VALI ÕIGE TÄHT <span
                                    class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="kirjatahed.html">Õpime kirjatähti</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="numbrid.html">123</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="arvuta.html">ARVUTA</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="kirjuta-ise.html">KIRJUTA ISE</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="ttu.html">TALTECH KODUÜLESANNE</a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <img src="images/student_PNG62552.png" alt="õpilased" class="h-2-em"></img>
                    </span>
                </div>
        `);
        }
    }
});
