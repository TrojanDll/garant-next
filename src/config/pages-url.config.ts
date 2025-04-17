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

  OSAGO_APPLY = `${this.OSAGO}/apply`;
  NS_APPLY = `${this.NS}/apply`;
}

export const PAGES = new PAGESCLASS();
