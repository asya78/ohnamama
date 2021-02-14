$(document).ready(function () {
    leftMenu();
    searchBar();
    validation();
    horoscope();
    weight();
});

// Left navigation menu
function leftMenu() {
    $('[data-toggle="slide-collapse"]').on('click', function () {
        leftMenu = $($(this).data('target'));
        leftMenu.show();
        $('.menu-overlay').fadeIn(500);

    });
    $('.menu-overlay').click(function (e) {
        $('.navbar-toggle').trigger('click');
        $('.menu-overlay').fadeOut(500);
           leftMenu.hide();
    });
    // Close left menu and overlay
    $('.login-left .close-menu').on('click', function () {
        $('#slide-left-menu').hide();
        $('.menu-overlay').fadeOut(500);
    });
}

// Search bar
function searchBar() {
    $('.search').on('click', function () {
        $('.search-form').show();
    });
    $('.close-search').on('click', function () {
        $('.search-form').hide();
    });
}

// Validation of login form
function validation() {
    $('form').click(function (e) {
        e.preventDefault();

        if ($('#email').val() === "") {
            $('#email').nextAll().eq(1).text('Моля въведете имейл.').show();
        } else {
            var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;
            if (regMail.test($("#email").val()) === false) {
                $('#email').nextAll().eq(1).text('Моля въведете валиден имейл.').show();
            } else {
                $('#email').nextAll().eq(1).text('').show();
            }

        }
        if ($('#password').val() === "") {
            $('#password').nextAll().eq(1).text('Моля въведете парола.').show();
            return false;
        }

    });
}

// Horoscope - initialization, list all, view active zodiac
function horoscope() {
    $.getJSON('js/horoscope.json', function (data) {
        // initialization
        var title = `${data[0].title}<span>${data[0].dates}</span>`;
        $('#zodiac button').html(title);
        $('#img-zodiac').attr('src',`../img/zodiac/${data[0].href}.svg`);
        // list all zodiacs
        $.each(data, function (index) {
            // create accordion with tabs of zodiacs
            var liItem = `<li class="nav-item">
                                <a id="tab-${data[index].href}" 
                                    href="#${data[index].href}" 
                                    class="nav-link"     
                                    data-toggle="tab" 
                                    name="${data[index].title}"
                                    dates="${data[index].dates}"
                                    role="tab">${data[index].title}
                                </a>
                              </li>`;
            var tabItem = `<div id="${data[index].href}" 
                                    class="card tab-pane fade " 
                                    role="tabpanel" 
                                    aria-labelledby="tab-${data[index].href}">
                                    <div class="card-header" role="tab" id="heading-${data[index].href}">
                                                Дневен хороскоп
                                           
                                    </div>
                                    <div id="collapse-${data[index].href}" 
                                         class="collapse show" 
                                         data-parent="#content" 
                                         role="tabpanel" 
                                         aria-labelledby="heading-${data[index].href}">
                                        <div class="card-body">
                                            ${data[index].description}
                                            <a href="${data[index].link}" class="card-link">
                                                <svg class="icon" width="15" height="16" viewBox="0 0 15 16">
                                                    <path fill="#467dfc" class="bbst0" d="M11.464 0h-4.4c-.3 0-.5.2-.5.5s.2.5.5.5h3l-5.5 5.7c-.2.2-.2.6 0 .8s.6.2.8 0l5.6-5.6v3c0 .3.2.5.5.5s.5-.2.5-.5V.5c0-.3-.2-.5-.5-.5z"></path><path fill="#467dfc" class="bbst0" d="M9.3 5.482c-.3 0-.6.2-.6.5v4.9H1.1v-7.6H6c.3 0 .5-.2.5-.5s-.2-.6-.5-.6H.5c-.3 0-.5.2-.5.5v8.7c0 .3.2.5.5.5h8.7c.3 0 .5-.2.5-.5v-5.4c.1-.3-.1-.5-.4-.5z">
                                                    </path>
                                                </svg>
                                                Месечен хороскоп
                                            </a>
                                        </div>
                                    </div>
                                </div>`;
            // append created tags to horoscope card
            $('#horoscope .card-body ul').append(liItem);
            $('#horoscope .card-body ul li').first().addClass('show active');
            $('#content.tab-content').append(tabItem);
            // make active first tab
            $('#content.tab-content div').first().addClass('active show');
        });
    });
    
    // Add event listener to zodiac tabs
    $('#tabs').delegate('li', 'click', function (e) {
        currTab = e.target;
        // change image and title of selected zodiac
        title = `${currTab.name}<span>${$(currTab).attr('dates')}</span>`;
        $('#zodiac button').html(title);
        img = currTab.href.substr(currTab.href.indexOf('#') + 1);
        $('#img-zodiac').attr('src',`../img/zodiac/${img}.svg`);
        // hide tabs after choose zodiac
        $('#tabs li.active').removeClass('show active');
        $('#zodiacs #tabs').removeClass('collapse show');
        // change up to down icon , make button collapse
        $('#zodiac h5').addClass('collapse-icon');
        $('#zodiac button').addClass('collapse');
    });
    
    // Change down to up icon on click button
    $('#zodiac button').on('click', function () {
        $('#zodiac h5').removeClass('collapse-icon');
    });
}

function weight() {
    // fill weeks in selection input
    for (i = 1; i <= 40; i++) {
        var option = `<option value=${i}>седмица ${i}</option>`;
        $('#weeks').append(option);
    }

    $('#calculate').click(function (e) {
        e.preventDefault();
        // get data from form

        // hide form and show result
        $('#form-weight').hide();
        $('.weight-result').show();

    });
}


