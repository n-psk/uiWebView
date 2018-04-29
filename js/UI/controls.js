function createAlertPayment() {
    var paymentAlert = document.getElementById('alertPayment');

    if (paymentAlert) {
        paymentAlert.show();
    } else {
        ons.createElement('alertPayment.html', { append: true })
            .then(function (paymentAlert) {
                paymentAlert.show();
            });
    }
};

function hideAlertPayment() {
    document.getElementById('alertPayment').hide();
};


document.addEventListener('init', function (event) {

    var page = event.target;

    if (page.id === 'home') {
        page.querySelector('#description-button').onclick = function () {
            document.querySelector('#myNavigator').pushPage('description.html', { data: { title: 'รายละเอียด' } });
        };
    } else if (page.id === 'description') {
        page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
    }
});

