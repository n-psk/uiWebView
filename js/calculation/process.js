let addValue = 0;
let setNumberProduct = { valueNumber: 0, textProduct: "ชิ้น" };
let setPriceProduct = { valueNumber: 0, textPrice: "บาท" };
const addPrice = []
const Products = [{ name: "a", price: 20 }, { name: "b", price: 10 }, { name: "c", price: 5 }]
const descriptionProducts = []
const description = []
const reducer = (accumulator, currentValue) => accumulator + currentValue;
let numberProductTrue = 0
for (var numberProduct = 0; numberProduct < Products.length; numberProduct++) {
    for (var property1 in Products[numberProduct]) { };
    addPrice.push(Products[numberProduct].price)
    numberProductTrue += 1
    descriptionProducts.push({ number: numberProductTrue, name: Products[numberProduct].name, price: Products[numberProduct].price })

    description.push({ form: `
    <ons-list-item>
    <div>${numberProductTrue}. ${Products[numberProduct].name} </div>
    <div style="margin-left: 85px;">${Products[numberProduct].price}บาท </div>
    <div class=" right"><button class="button-clancel" style="background: #ff3029; font-size: 40px;">-</button></div>
    </ons-list-item>` })
}

let totalPrice = addPrice.reduce(reducer)
// console.log(description);

// console.log(i);
// console.log(totalPrice);

setNumberProduct.valueNumber = numberProduct;
setPriceProduct.valueNumber = totalPrice;

let allNumberProduct = setNumberProduct.valueNumber + " " + setNumberProduct.textProduct;
var allPriceProduct = setPriceProduct.valueNumber + " " + setPriceProduct.textPrice;


function topBar() {
    document.getElementById('numberValue').value = setNumberProduct.valueNumber;
    document.getElementById('numberProduct').innerText = allNumberProduct;
    document.getElementById('priceProduct').innerText = allPriceProduct;
}

function alertPayment() {
    document.getElementById('totalPriceProduct').innerText = allPriceProduct;

    $('#payment').keyup(function () {
        let paymentValue = $(this).val();
        let change = paymentValue - setPriceProduct.valueNumber;
        let allChange = change + " " + setPriceProduct.textPrice;
        $('#change').text(allChange);
    });
}


function Description() {
    ons.ready(function () {
        var infiniteList = document.getElementById('infinite-list');
        for (var descriptionNumber = 0; descriptionNumber < description.length; descriptionNumber++) {
            for (var property2 in description[descriptionNumber]) { };
            infiniteList.delegate = {
                createItemContent: function (descriptionNumber) {
                    return ons.createElement(description[descriptionNumber].form);
                },
                countItems: function () {
                    for (var descriptionNumber = 0; descriptionNumber < description.length; descriptionNumber++) {
                        for (var property2 in description[descriptionNumber]) { };
                    }
                    return descriptionNumber;
                }
            };
        }
    });
}