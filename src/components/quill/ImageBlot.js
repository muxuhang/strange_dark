// import Parchment from 'parchment';
import { sanitize } from 'quill/formats/link';
import Image from "quill/formats/image";
import Quill from 'quill';
const Image = Quill.import('quill/formats/image');
const Parchment = Quill.imports.parchment;
const ATTRIBUTES = [
  'alt',
  'height',
  'width'
];
class ImageBlot extends Parchment.Embed {
  static create(value) {
    let node = super.create(value);
    // if (typeof value === 'string') {
    //   node.setAttribute('src', this.sanitize(value));
    // }
    // else{
    //   node.setAttribute('src', this.sanitize(value.src));
    //   node.setAttribute('height', value.height);
    //   node.setAttribute('width', value.width);
    // }
    return node;
  }
  static sanitize(url) {
    return sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
  }
}
ImageBlot.blotName = 'imageBlot';
ImageBlot.tagName = 'IMG';


export default ImageBlot;
