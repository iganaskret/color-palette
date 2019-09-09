"use strict";

const root = document.documentElement;
const colorInput = document.querySelector("#picker");
const hex = document.querySelector("#hex");
const rgb = document.querySelector("#rgb");
const hsl = document.querySelector("#hsl");

function hexToRGB(h) {
  h = h.replace("#", "");
  let r = parseInt(h.substring(0, 2), 16);
  let g = parseInt(h.substring(2, 4), 16);
  let b = parseInt(h.substring(4, 6), 16);

  let result = "(" + r + "," + g + "," + b + ")";
  return result;
}

function rgbToHSL(x) {
  x = x.slice(1, -1);
  let r = x.split(",")[0];
  let g = x.split(",")[1];
  let b = x.split(",")[2];
  console.log(r);
  console.log(g);
  console.log(b);
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  let result = `${h}° ${s}% ${l}%`;
  return result;
}

function changeValue() {
  root.style.setProperty("--color", colorInput.value);
  hex.textContent = colorInput.value;
  rgb.textContent = hexToRGB(hex.textContent);
  hsl.textContent = rgbToHSL(rgb.textContent);
}

colorInput.addEventListener("change", changeValue);
