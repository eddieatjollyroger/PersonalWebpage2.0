    // Parallax background movement
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const bg = document.querySelector(".background");
      bg.style.transform = `translate(${clientX / 50}px, ${clientY / 50}px)`;
    });

    // Typing animation
    document.querySelectorAll(".typing").forEach((el) => {
      const text = el.textContent.trim();
      el.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 20);
        }
      }
      type();
    });

  const container = document.querySelector('.matrix-container');
  const numCols = Math.floor(window.innerWidth / 20);
  const numRows = Math.floor(window.innerHeight / 20);

  for (let i = 0; i < numCols; i++) {
    const column = document.createElement('div');
    column.classList.add('matrix-column');
    column.style.animationDuration = `${5 + Math.random() * 5}s`;
    column.style.animationDelay = `${Math.random() * 5}s`; // stagger starts

    let binaryStr = '';
    for (let j = 0; j < numRows * 2; j++) {
      binaryStr += Math.round(Math.random()) + '\n';
    }
    column.textContent = binaryStr;

    container.appendChild(column);
  }

  const terminalWindow = document.querySelector('.terminal-window');
const header = terminalWindow.querySelector('.terminal-header');

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

header.addEventListener('mousedown', (e) => {
  isDragging = true;
  const rect = terminalWindow.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;

  // Prevent text selection while dragging
  document.body.style.userSelect = 'none';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.userSelect = 'auto';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  // Calculate new position
  let newLeft = e.clientX - dragOffsetX;
  let newTop = e.clientY - dragOffsetY;

  // Optional: constrain inside viewport
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const elWidth = terminalWindow.offsetWidth;
  const elHeight = terminalWindow.offsetHeight;

  newLeft = Math.min(Math.max(0, newLeft), windowWidth - elWidth);
  newTop = Math.min(Math.max(0, newTop), windowHeight - elHeight);

  // Set new position
  terminalWindow.style.left = newLeft + 'px';
  terminalWindow.style.top = newTop + 'px';
});