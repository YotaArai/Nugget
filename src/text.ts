export default class Text{
  element: HTMLElement;
  text: string;
  intervalId: number;

  constructor() {
    this.text = "これは おじさんの きんのたま!\nゆうこうに かつようして くれ!";
    this.element = document.getElementById("typing-animation") as HTMLElement;
    this.intervalId = 0;
    this.onLoad();
    window.addEventListener("click", this.onClick.bind(this));
  }

  onLoad() {
    let currentText = "";
    const chars = Array.from(this.text);
    let position = 0;
    this.intervalId = window.setInterval(() =>{
      if (chars[position] == undefined) {
        window.clearInterval(this.intervalId);
        return;
      }
      currentText += chars[position]; 
      this.element.innerText = currentText;
      position++;
    }, 70);
  }
      
  onClick(){
    this.element.innerText = this.text;
    window.clearInterval(this.intervalId);
  }
}
