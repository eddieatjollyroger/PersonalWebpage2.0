const input = document.getElementById("command-input");
const output = document.getElementById("output");
const modal = document.getElementById("terminal-modal");
const openBtn = document.getElementById("open-terminal");
const closeBtn = document.getElementById("close-terminal");

let history = [];
let historyIndex = -1;

const ratAsciiArt = `
----{,_,">
    `;

const catAsciiArt = `
    =^..^=
    `;

const commands = {
  help: "Available commands: help, about, projects, personal, tecnologies, contact, clear, hello, spin",
  about: "I am a Backend Developer who loves retro terminals, type projects to see a list of websites i've built or worked on",
  personal: "Firefox/Chrome Addon: Tab Explorer, Snake made with Unity Engine, Flappy bird during Hackathon, Linux fully dynamic rice(where my terminal love began), etc...",
  projects: "Websites for: Avene, Ascendum, Banco De Portugal, Banco Economico, Eu Sou Digital, Luso, Minipreco, Mudar E Ganhar, Portugal Clinical Trials, Portugal Digital Summit, Parques de Sintra, Sagres, and many more...",
  contact: "Email: hello@joaopacheco.me",
  projects2: `
- <a href="https://github.com/yourname/project1" target="_blank">Project 1</a>
- <a href="https://github.com/yourname/project2" target="_blank">Project 2</a>
- <a href="https://github.com/yourname/project3" target="_blank">Project 3</a>
  `,
  clear: "",
  hello: "world!",
  tecnologies: "C#, .NET, JAVA, NodeJS, SQL, GIT, Azure, Umbraco, etc..",
  spin: "spinner",
  rat: ratAsciiArt,
  cat: catAsciiArt
};

function typeWriter(text, container, speed = 30) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      container.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const cmd = input.textContent.trim().toLowerCase();

    if (cmd) {
      history.push(cmd);
      historyIndex = history.length;
    }

    const div = document.createElement("div");
    div.textContent = `$ ${cmd}`;
    output.appendChild(div);

    if (cmd === "clear") {
      output.innerHTML = "";
    }
    else if (cmd === "spin") {
      const art = document.createElement("div");
      output.appendChild(art);
      spinAnimation(art);

  } else if (commands[cmd]) {
    const res = document.createElement("div");
    output.appendChild(res);
    typeWriter(commands[cmd], res);
  } else {
    const res = document.createElement("div");
    typeWriter("Command not found. Type 'help'.", res);
    output.appendChild(res);
  }

  input.textContent = "";
  placeCaretAtEnd(input);

  window.scrollTo(0, document.body.scrollHeight);
}

  if (e.key === "ArrowUp") {
  if (historyIndex > 0) {
    historyIndex--;
    input.textContent = history[historyIndex];

  }
  e.preventDefault();
}

if (e.key === "ArrowDown") {
  if (historyIndex < history.length - 1) {
    historyIndex++;
    input.textContent = history[historyIndex];
  } else {
    historyIndex = history.length;
    input.textContent = "";
  }
  e.preventDefault();
}
});

// Auto-focus when the page loads
placeCaretAtEnd(input);

function spinAnimation(element) {
  const frames = ['|', '/', '-', '\\'];
  let i = 0;
  let count = 0;
  const interval = setInterval(() => {
    element.textContent = `Loading ${frames[i % frames.length]}`;
    i++;
    count++;
    if (count > 20) {
      clearInterval(interval);
      element.textContent = "Done!";
    }
  }, 100);
}


openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  input.focus();
});

document.addEventListener("click", () => {
  document.getElementById("command-input").focus();
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

const terminal = document.getElementById("terminal");
let terminalisDragging = false;
let terminaldragOffsetX = 0;
let terminaldragOffsetY = 0;

// Start dragging
terminal.addEventListener("mousedown", (e) => {
  terminalisDragging = true;
  terminaldragOffsetX = e.clientX - terminal.getBoundingClientRect().left;
  terminaldragOffsetY = e.clientY - terminal.getBoundingClientRect().top;
});

// Stop dragging
document.addEventListener("mouseup", () => {
  terminalisDragging = false;
});

// Handle dragging
document.addEventListener("mousemove", (e) => {
  if (terminalisDragging) {
    terminal.style.position = "fixed";
    terminal.style.left = `${e.clientX - terminaldragOffsetX}px`;
    terminal.style.top = `${e.clientY - terminaldragOffsetY}px`;
  }
});