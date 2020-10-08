export abstract class ECApp {
  private aNumber = 10;

  static async getInstanceOf(className: string, path: string) {
    const AppClassImport = await import(path);
    return new AppClassImport[className] as ECApp;
  }

  protected constructor() { }

  get theNumber(){ return this.aNumber }

  abstract onResume(): void;
  abstract onPause(): void;
  abstract onStop(): void;
}
