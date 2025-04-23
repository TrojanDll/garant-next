class PAGESCLASS {
  private root = "/";

  HOME = this.root;
  CALCULATOR = `${this.root}calculator`;
  OSAGO = `${this.root}osago`;
  NS = `${this.root}ns`;
  CONTACTS = `${this.root}contacts`;
  HELP = `${this.root}help`;
  DASHBOARD = `${this.root}dashboard`;
  DOCUMENTS = `${this.root}documents`;
  ABOUT = `${this.root}about`;
  POLICY = `${this.root}policy`;
  RECOVERY = `${this.root}recovery`;
  AUTH = `${this.root}auth`;

  OSAGO_APPLY = `${this.OSAGO}/apply`;
  NS_APPLY = `${this.NS}/apply`;

  CARS = `${this.DASHBOARD}/cars`;
  CARS_NEW = `${this.CARS}/new`;


  MY_POLICIES = `${this.DASHBOARD}/my-policies`;
  EDIT_PERSONAL_DATA = `${this.DASHBOARD}/edit-personal-data`;
}

export const PAGES = new PAGESCLASS();
