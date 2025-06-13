class PAGESCLASS {
  private root = "/";

  HOME = this.root;
  CALCULATOR = `${this.root}calculator`;
  OSAGO = `${this.root}osago`;
  NS = `${this.root}ns`;
  CONTACTS = `${this.root}contacts`;
  SUPPORT = `${this.root}support`;
  DASHBOARD = `${this.root}dashboard`;
  DOCUMENTS = `${this.root}documents`;
  ABOUT = `${this.root}about`;
  POLICY = `${this.root}policy`;
  RECOVERY = `${this.root}recovery`;
  AUTH = `${this.root}auth`;
  POLICY_INFO = `${this.root}policy-info`;
  POLICY_INFO_OSAGO = `${this.POLICY_INFO}/osago-`;
  POLICY_INFO_NS = `${this.POLICY_INFO}/ns-`;
  LEGAL = `${this.POLICY_INFO}/legal`;

  OSAGO_APPLY = `${this.OSAGO}/apply`;
  OSAGO_CONFIRM = `${this.OSAGO}/confirm`;
  NS_APPLY = `${this.NS}/apply`;
  NS_CONFIRM = `${this.NS}/confirm`;

  CARS = `${this.DASHBOARD}/cars`;
  CARS_NEW = `${this.root}new-car`;
  CARS_EDIT = `${this.root}edit-car`;

  MY_POLICIES = `${this.DASHBOARD}/my-policies`;
  EDIT_PERSONAL_DATA = `${this.DASHBOARD}/edit-personal-data`;
}

export const PAGES = new PAGESCLASS();
