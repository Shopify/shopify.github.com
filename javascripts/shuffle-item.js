class ShuffleItem {
  constructor(element) {
    this.element = element;
    this.isVisible = true;
    this.prevDisplay = "block";
  }

  show() {
    this.isVisible = true;
    this.element.removeAttribute('aria-hidden');
    this.element.style.display = this.prevDisplay;
  }

  hide() {
    this.isVisible = false;
    this.prevDisplay = this.element.style.display;
    this.element.style.display = "none";
    this.element.setAttribute('aria-hidden', true);
  }
}

export default ShuffleItem
