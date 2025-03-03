let input;
let slider;
let button;
let dropdown;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(10, 10);
  slider = createSlider(5, 30, 32); // 創建滑桿，範圍從5到30，初始值為32
  slider.position(input.x + input.width + 10, 10); // 將滑桿放置在文字框的右側
  button = createButton('跳動文字');
  button.position(slider.x + slider.width + 10, 10); // 將按鈕放置在滑桿的右側
  button.mousePressed(toggleJumping);

  dropdown = createSelect();
  dropdown.position(button.x + button.width + 10, 10); // 將下拉式選單放置在按鈕的右側
  dropdown.option('第一周');
  dropdown.option('第二周');
  dropdown.option('第三周');
  dropdown.changed(goToURL);
}

let jumping = false;

function toggleJumping() {
  jumping = !jumping;
  if (jumping) {
    offsets = Array.from({ length: Math.ceil(width / textWidth(input.value())) + 1 }, () => random(0, 1000));
  }
}

function goToURL() {
  let selected = dropdown.value();
  if (selected === '第一周') {
    window.location.href = 'https://www.tku.edu.tw/';
  } else if (selected === '第二周') {
    window.location.href = 'https://www.et.tku.edu.tw/';
  } else if (selected === '第三周') {
    window.location.href = 'https://hackmd.io/@KEITO1416/r1oZ1ozoyl';
  }
}

function draw() {
  background(220);
  let textValue = input.value();
  let textSizeValue = slider.value(); // 獲取滑桿的值
  textAlign(LEFT, TOP);
  textSize(textSizeValue);
  fill(0); // 設置文字顏色為黑色
  if (textValue.length > 0) {
    let repeatedText = textValue.repeat(Math.ceil(width / textWidth(textValue)) + 1);
    let y = 0;
    while (y < height) {
      for (let i = 0; i < repeatedText.length; i++) {
        let char = repeatedText.charAt(i);
        let x = textWidth(repeatedText.substring(0, i));
        let offsetY = 0;
        if (jumping) {
          offsetY = sin((frameCount + offsets[i % offsets.length]) * 0.1) * 10;
        }
        text(char, x, y + offsetY);
      }
      y += textAscent() + textDescent();
    }
  }
}