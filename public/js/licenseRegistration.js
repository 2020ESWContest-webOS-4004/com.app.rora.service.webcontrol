const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    console.log('<submit Event occurs>');
    const licenseClass = getLicenseClass();
    const licenseNumber = concatLicenseNumber();

    // 정규화 함수 구현

    event.preventDefault();
})

function getLicenseClass(){
    let LisenceClass = document.getElementById('license_class').value;
    
    console.log('select license class : ', LisenceClass);

    return LisenceClass;
}

function concatLicenseNumber() {
    let licenseNum = document.getElementById('license_num1').value;
    licenseNum += '-' + document.getElementById('license_num2').value;
    licenseNum += '-' + document.getElementById('license_num3').value;
    licenseNum += '-' + document.getElementById('license_num4').value;

    console.log('license Concat : ', licenseNum);

    return licenseNum;
}
