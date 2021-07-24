import { init } from 'ityped'

export default class Text{
  element: HTMLElement;

  constructor() {
    this.element = document.querySelector('#itype-text') as HTMLElement;
    init(this.element, { 
      showCursor: false,
      strings: ['これは おじさんの きんのたま!\nゆうこうに かつようして くれ!'],
      disableBackTyping: false,
      loop: false,
      typeSpeed: 100,
    });
  }
}
