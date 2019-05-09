class App {
  constructor() {

    // Elements from DOM
    this.dateNowElement = document.querySelector('#dateNow');
    this.listOfMonthElement = document.querySelector('#listOfMonth');
    this.totalAmountElement = document.querySelector('#totalAmount');

    this.buildInitDomElements();

    // set events
    this.initEvent();

  }

  buildData() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    return day + "/" + month + "/" + year;
  }

  buildInitDomElements() {
    this.dateNowElement.innerHTML = this.buildData();

    const listOfMonth = this.getListOfMonth();

    let listOutput = "";
    let totalAmount = 0;

    listOfMonth.forEach(register => {
      listOutput+= register.print();

      if (register.getType() === 'Income') {
        totalAmount += register.getAmount();
      } else {
        totalAmount -= register.getAmount();
      }

    });

    this.listOfMonthElement.innerHTML = listOutput;
    this.totalAmountElement.innerHTML = totalAmount + '€';

    if (totalAmount < 0) {
      this.totalAmountElement.className = "text-danger";
    } else {
      this.totalAmountElement.className = "text-success";
    }
  }

  initEvent() {


  }

  getListOfMonth() {
    return [
        new FinanceRegister(1, 'Income', 'Month Salary', 100),
        new FinanceRegister(2,'Income', 'Home Rentals', 500),
        new FinanceRegister(3,'Expense', 'Tax Home Rentals', 200)
    ];
  }


}
