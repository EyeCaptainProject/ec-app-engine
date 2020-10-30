import { ECApp } from './ECApp';

export class ECAppEngine {
  private static apps: ECApp[];

  constructor() {
    // TODO: Hand over list of apps
  }

  public installApp() {}

  public uninstallApp() {
    // Store in local file
  }

  public startApp(appId: string): boolean {
    // Load context and send to app
    // App.start(context)
    return false;
  }

  public stopApp() {
    // Get context from app and store
    // App.getState() -> Store
    // context.save()
  }
}
