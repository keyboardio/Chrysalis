export default function rgb2w(rgb) {
  let Ri = rgb.r;
  let Gi = rgb.g;
  let Bi = rgb.b;
  let minVal = Math.min(Ri, Math.min(Gi, Bi));

  let w = minVal;
  let b = Bi - minVal;
  let r = Ri - minVal;
  let g = Gi - minVal;

  let result = { r, g, b, w };

  return result;
}
