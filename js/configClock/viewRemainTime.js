var countDown = function () {
  this.createListNumber = function () {
    this.ul = document.createElement("ul");
    this.elementLi = [];
    this.char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
    this.createLi = function (view) {
      for (var i = 0; i <= 9; i++) {
        this.elementLi[i] = document.createElement("li");
        this.elementLi[i].innerHTML = i;
        this.ul.appendChild(this.elementLi[i]);
      }
      for (var j = 0; j < this.char.length; j++) {
        this.elementLi[i + j] = document.createElement("li");
        this.elementLi[i + j].innerHTML = this.char[j];
        this.ul.appendChild(this.elementLi[i + j]);
      }
      view.appendChild(this.ul);
    };
  };
  this.displayNumber = function (elementTime, value) {
    elementTime.ul.style.top = -100 * value + "%";
  };
};
function displayClock() {
  this.clock = document.getElementsByClassName("clock")[0];
  this.elementTime = document.getElementsByClassName("element-time");
  this.timeName = document.querySelectorAll(
    ".clock .viewTime .time-remain > p"
  );
  this.haiCham = document.querySelectorAll(".clock .viewTime .hai-cham > p");
  this.i = 0;
  this.j = 0;

  this.displayContainClock = function () {
    setTimeout(() => {
      this.clock.style.width = "50%";
      this.clock.style.transition = "1s";
      setTimeout(() => {
        this.clock.style.height = "220px";
      }, 300);
    }, 500);
  };
  this.displayElementTime = function () {
    this.display(800, 100, 1, this.elementTime, "top", 0, "px");
  };
  this.displayTimeName = function () {
    this.display(1000, 200, 1, this.timeName, "top", -30, "%");
  };
  this.displayHaiCham = function () {
    this.display(1000, 200, 1, this.haiCham, "top", 0, "%");
  };
}

displayClock.prototype = new displayAll();
var displayClock = new displayClock();
displayClock.displayContainClock();
displayClock.displayElementTime();
displayClock.displayTimeName();
displayClock.displayHaiCham();

var remainTime = function (
  year,
  month,
  date,
  hourn,
  minute,
  second,
  millisecond
) {
  this.dateN;
  this.dateF;
  this.timeNumberN;
  this.timeNumberF;
  this.interval;
  this.dateRemain = [];
  this.timeRemain;

  this.timeN = function () {
    this.dateN = new Date();
    this.timeNumberN = this.dateN.getTime() + 7 * 60 * 60 * 1000;
    return this.timeNumberN;
  };

  this.timeF = function () {
    this.dateF = new Date(
      year,
      month - 1,
      date,
      hourn,
      minute,
      second,
      millisecond
    );
    this.timeNumberF = this.dateF.getTime() + 7 * 60 * 60 * 1000;
    return this.timeNumberF;
  };

  this.getRemainTime = function () {
    this.timeRemain = this.timeF() - this.timeN();
    if (this.timeRemain >= 0) {
      this.dateRemain[0] = Math.floor(this.timeRemain / (24 * 60 * 60 * 1000));
      this.dateRemain[1] = Math.floor(
        (this.timeRemain % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      this.dateRemain[2] = Math.floor(
        (this.timeRemain % (60 * 60 * 1000)) / (60 * 1000)
      );
      this.dateRemain[3] = Math.floor((this.timeRemain % (60 * 1000)) / 1000);
      return this.dateRemain;
    } else {
      return "NEW_YEAR";
    }
  };
};

var viewRemainTime = function () {
  this.objRemainTime = new remainTime(2025, 1, 29, 0, 0, 0, 0);
  // this.objRemainTime = new remainTime(
  //   new Date().getFullYear(),
  //   new Date().getMonth() + 1,
  //   new Date().getDate(),
  //   new Date().getHours(),
  //   new Date().getMinutes(),
  //   new Date().getSeconds() + 3, // Thêm 6 giây
  //   0
  // );

  this.remainTime = [];
  this.listNumberOfViewElementTime = [];
  this.viewElementTime = document.getElementsByClassName("element-time");
  this.elementTime = [];
  this.x = null;

  this.addListNumberForElementTime = function () {
    for (var i = 0; i < this.viewElementTime.length; i++) {
      this.listNumberOfViewElementTime[i] = new this.createListNumber();
      this.listNumberOfViewElementTime[i].createLi(this.viewElementTime[i]);
    }
  };

  this.updateChangeRemainTime = function () {
    this.addListNumberForElementTime();
    var interval = setInterval(() => {
      this.remainTime = this.objRemainTime.getRemainTime();
      if (this.remainTime != "NEW_YEAR") {
        this.remainTime.forEach((value, index) => {
          value = value.toString();
          value = value.split("");
          if (value.length == 1) value.unshift("0");
          this.remainTime[index] = value;
        });
        this.remainTime.forEach((value) => {
          this.elementTime = this.elementTime.concat(value);
        });
        this.elementTime.forEach((value, index) => {
          this.displayNumber(this.listNumberOfViewElementTime[index], value);
        });
        this.elementTime = [];
      } else {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = "phaohoa.html";
        }, 1500);
      }
    }, 1000);
  };
};

viewRemainTime.prototype = new countDown();
var happyNewYear = new viewRemainTime();
happyNewYear.updateChangeRemainTime();
