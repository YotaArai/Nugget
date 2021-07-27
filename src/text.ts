export default class Text{
  element: HTMLElement;
  texts: string[];
  intervalId: number;
  textIndex: number;
  waitFlg: boolean;
  displayChars: string[];
  charPosition: number;
  currentText: string;
  lineHeight: string;
  style: any;
  y: number;

  constructor() {
    this.texts = [
      "これは おじさんの きんのたま!\nゆうこうに かつようして くれ!", 
      "おじさんの きんのたま だからね!",
    ];
    this.element = document.getElementById("typing-animation") as HTMLElement;
    this.style = window.getComputedStyle(this.element);
    this.lineHeight = this.style.getPropertyValue('line-height');
    this.intervalId = 0;
    this.textIndex = 0;
    this.waitFlg = false;
    this.displayChars = new Array();
    this.charPosition = 0;
    this.currentText = "";
    this.displayText(this.textIndex);
    this.y = 0;
    window.addEventListener("click", this.onClick.bind(this));
    window.addEventListener('animationend', this.endAnimation.bind(this));
  }

  displayText(index: number) {
    this.displayChars = this.displayChars.concat(Array.from(this.texts[index]));
    this.intervalId = window.setInterval(() =>{
      if (this.displayChars[this.charPosition] == undefined) {
        this.finishDisplayText();
        return;
      }
      this.currentText += this.displayChars[this.charPosition]; 
      this.element.innerText = this.currentText;
      this.charPosition++;
    }, 60);
  }
      
  onClick(){
    if(!this.waitFlg){
      return;
    }
    this.textIndex++;
    document.getElementsByTagName('body')[0].style.cursor = 'auto';
    if(this.textIndex >= this.texts.length){
      return;
    }
    this.element.style.animationName = this.getAnimationType();
    this.displayChars.push('\n');
    this.waitFlg = false;
    this.displayText(this.textIndex);
  }

  finishDisplayText(){
    window.clearInterval(this.intervalId);
    this.waitFlg = true;
    let cursor = 'pointer';
    if(this.textIndex >= this.texts.length - 1){
      cursor = 'auto';
    }
    document.getElementsByTagName('body')[0].style.cursor = cursor;
  }

  endAnimation(){
    const cssStyle = window.getComputedStyle(this.element) as CSSStyleDeclaration;
    const res = cssStyle.transform.match(/\((.*)\)/);
    if(!res){
      return;
    }
    const arr = res[1].split(",");
    this.y += parseInt(arr[5]);
    this.element.style.transform = '';
    this.element.style.top = this.y + 'px';
    this.element.style.animationName = '';
  }

  getAnimationType(){
    let width = window.innerWidth;
    if(width > 959){
      return 'moveUpPc';
    }else if(width > 519){
      return 'moveUpTablet';
    }else{
      return 'moveUp';
    }
  }
}
