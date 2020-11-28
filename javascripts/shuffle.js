import ShuffleItem from './shuffle-item';

class Shuffle {
  constructor(el, itemSelector) {
    this.element = el;
    this.items = Array.from(this.element.children)
      .filter((el) => el.matches(itemSelector))
      .map((el) => new ShuffleItem(el));
  }

  filter(func) {
    this.items.forEach((item) => {
      item.show()
      return func.call(item.element, item.element, this) ? item.show() : item.hide()
    });
  }

  sort(compare) {
    this.items
      .filter((item) => item.isVisible)
      .sort((itemA, itemB) => compare(itemA.element, itemB.element) ? -1 : 1)
      .forEach((item, i) => item.element.style.order = i);
  }
}

export default Shuffle
