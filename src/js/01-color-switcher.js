function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  const body = document.querySelector('body');
  let timerId = null;
  
  startButton.addEventListener('click', onClick);
  stopButton.addEventListener('click', stopBackgroundColor);
  function onClick(e) {
    startChangeColors();
    timerId = setInterval(startChangeColors, 1000);
    e.currentTarget.disabled = true;
  }
  
  function stopBackgroundColor(e) {
    clearInterval(timerId);
    startButton.disabled = false;
  }
  
  function startChangeColors() {
    body.style.backgroundColor = getRandomHexColor();
  }