exports.concatCardNumber = (data) => data.card_num1 + data.card_num2 + data.card_num3 + data.card_num4;

exports.concatExpirationDate = (data) => data.date_Month + '/' + data.date_Year;

exports.concatLicenseNumber = (data) => data.license_num1 + data.license_num2 + data.license_num3 + data.license_num4;
