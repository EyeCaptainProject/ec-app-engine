class ECComponent {
  xml!: string;
  json!: string;

  props: any;

  constructor(xmlPath: string) {
    // Load xml
    // this.json = xml.parse
  }

}

class ECLayout {
  private components!: ECComponent[];
}

export class ECAppScreen {
  private layout!: ECLayout;

}
