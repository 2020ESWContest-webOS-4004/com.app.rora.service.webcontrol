const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    console.log('<submit Event occurs>');
    const cardNum = concatCardNumber();
    const expirationDate = concatExpirationDate();

    // 정규화 함수 구현

    event.preventDefault();
})

function concatCardNumber() {
    let cardNum = document.getElementById('card_num1').value;
    cardNum += '-' + document.getElementById('card_num2').value;
    cardNum += '-' + document.getElementById('card_num3').value;
    cardNum += '-' + document.getElementById('card_num4').value;

    console.log('cardNum Concat : ', cardNum);

    return cardNum;
}

function concatExpirationDate() {
    let dateStr = document.getElementById('date_Month').value;
    dateStr += '/' + document.getElementById('date_Year').value;

    console.log('expirationDate Concat : ', dateStr);

    return dateStr;
}