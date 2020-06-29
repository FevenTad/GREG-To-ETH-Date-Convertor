
function convertDate(gregorianDate) {
    var ethMonths = ['Meskerem', 'Tikemet', 'Hidar', 'Tahesas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'];
    var gregDaysPerMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    function myDate(habeshaDay, habeshaMonth, habeshaYear, gregDay, gregMonth, gregYear) {
        this.habeshaDay = habeshaDay;
        this.habeshaMonth = habeshaMonth;
        this.habeshaYear = habeshaYear;

        this.gregDay = gregDay;
        this.gregMonth = gregMonth;
        this.gregYear = gregYear;
    };

    // initializing reference date and final converted date
    var myDate1 = new myDate(22, 4, 2012, 1, 1, 2020);
    var myDate2 = new myDate(0, 0, 0, 0, 0, 0);

    var numberOfDays = 0;
    var numberOfMonths = 0;
    var remainingDays = 0;
    var daysToBeAdded = 0;

    // input to the function might be string or number or date so changing to date object is necessary
    var selectedDate = new Date(gregorianDate);
    var selectedDay = selectedDate.getDate();
    var selectedMonth = selectedDate.getMonth() + 1;
    var selectedYear = selectedDate.getFullYear();

    // add the number of days in the months in between Jan and the selected month
    for (var i = myDate1.gregMonth - 1; i < selectedMonth - 1; i++) {
        numberOfDays += gregDaysPerMonth[i];
    }
    //add the additional days from selectedDay
    numberOfDays = (numberOfDays + selectedDay) - 1;

    numberOfMonths = Math.floor(numberOfDays / 30); // to get number of months in between Jan and selected month
    remainingDays = numberOfDays % 30; // to get the remaining days

    // this is total number of days to be added
    daysToBeAdded = (myDate1.habeshaDay + remainingDays);

    // if number days is greater thatn 30 that means it overflowing to the next month
    // so we need to increase numberOfMonths by 1
    if (daysToBeAdded > 30) {
        numberOfMonths += 1;

        // if numberOfMonths is greater than 8 then adding that to myDate1.habeshaMonth would increase 
        // myDate2.habeshaMonth above 12. So the else block should be executed
        if (numberOfMonths <= 9) {
            myDate2.habeshaMonth = myDate1.habeshaMonth + numberOfMonths;
            myDate2.habeshaDay = daysToBeAdded - 30;
            myDate2.habeshaYear = selectedYear - 8;
        } else {
            myDate2.habeshaMonth = (myDate1.habeshaMonth + numberOfMonths) - 12;
            myDate2.habeshaYear = selectedYear - 7;

            // every 4 year pagume is 6 days
            if ((Math.abs(selectedYear - 2019)) % 4 !== 0) {
                myDate2.habeshaDay = (daysToBeAdded - 30) - 5; // this means Pagume has been touched so we need to subtract additional 5 days
            } else {
                myDate2.habeshaDay = (daysToBeAdded - 30) - 6;
            }


            // If there is  a negative day then it means you have to go one month back and decrese the date valur from 30
            if (myDate2.habeshaDay < 0) {
                myDate2.habeshaMonth -= 1;
                myDate2.habeshaDay = 30 - Math.abs(myDate2.habeshaDay);
            }
        }

    } else {
        if (numberOfMonths <= 9) {
            myDate2.habeshaMonth = myDate1.habeshaMonth + numberOfMonths;
            myDate2.habeshaDay = daysToBeAdded;
            myDate2.habeshaYear = selectedYear - 8;
        } else {
            if ((Math.abs(selectedYear - 2019)) % 4 !== 0) {
                daysToBeAdded -= 5;
            } else {
                daysToBeAdded -= 6;
            }
            myDate2.habeshaMonth = (myDate1.habeshaMonth + numberOfMonths) - 12;
            myDate2.habeshaDay = daysToBeAdded;
            myDate2.habeshaYear = selectedYear - 7;
        }

    }
    console.log(ethMonths[myDate2.habeshaMonth - 1] + " " + myDate2.habeshaDay + ", " + myDate2.habeshaYear);
};

export default convertDate;

