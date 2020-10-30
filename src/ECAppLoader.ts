import { ECApp } from './ECApp';

export class ECAppLoader {
  static async loadApp(path: string): ECApp {
    // Load config
    // config = json.loads(path)
    const config = { classame: 'Test' };
    return await ECApp.getInstanceOf(config.classame, path);
  }
}
