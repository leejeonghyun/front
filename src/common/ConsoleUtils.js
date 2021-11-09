const ConsoleUtils = {

  isLog: true,
  // isLog: false,

  // import ConsoleUtils from '@/common/ConsoleUtils';
  // ConsoleUtils.log("1");
  // ConsoleUtils.log("this");
  // ConsoleUtils.log("$this");
  // ConsoleUtils.log("2");
  // ConsoleUtils.log(this);
  // ConsoleUtils.log($this);
  // ConsoleUtils.log("1", "2");
  // ConsoleUtils.log("this", this);
  // ConsoleUtils.log("$this", $this);

  log: function (obj1, obj2) {
    // console.log("this.isLog", this.isLog);

    if (this.isLog == false) {
      return;
    }

    if (obj2 === undefined) {
      console.log(obj1);
    } else {
      console.log(obj1, obj2);
    }
  },

};

export default ConsoleUtils;
