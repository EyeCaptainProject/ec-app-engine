export class TestClass {
  private aNumber;

  constructor(aNumber: number) {
    this.aNumber = aNumber;
  }

  get theNumber(){ return this.aNumber }
}
