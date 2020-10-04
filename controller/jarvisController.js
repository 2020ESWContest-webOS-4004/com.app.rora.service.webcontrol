exports.concatCardNumber = (data) => data.card_num1 + data.card_num2 + data.card_num3 + data.card_num4;

exports.concatExpirationDate = (data) => data.date_Month + '/' + data.date_Year;

exports.concatLicenseNumber = (data) => data.license_num1 + data.license_num2 + data.license_num3 + data.license_num4;


exports.getTimeStringSeconds = (seconds) => {
    var hour, min, sec
    hour = parseInt(seconds / 3600);
    min = parseInt((seconds % 3600) / 60);
    sec = parseInt(seconds % 60);

    if (hour.toString().length == 1) hour = "0" + hour;
    if (min.toString().length == 1) min = "0" + min;
    if (sec.toString().length == 1) sec = "0" + sec;

    return hour + ":" + min + ":" + sec;

}

exports.numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

