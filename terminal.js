const input = document.getElementById("command-input");
const output = document.getElementById("output");
const modal = document.getElementById("terminal-modal");
const openBtn = document.getElementById("open-terminal");
const closeBtn = document.getElementById("close-terminal");

let placeholderText = "type 'help' to get started";
let placeholderIndex = 0;
let placeholderInterval;
let isTyping = false;

let history = [];
let historyIndex = -1;

const ratAsciiArt = `
----{,_,">
    `;

const catAsciiArt = `
    =^..^=
    `;

const commands = {
  help: "Available commands: help, about, projects, personal, tecnologies, contact, clear, hello, spin, neofetch",
  about: "I am a Backend Developer who loves retro terminals, type projects to see a list of websites i've built or worked on",
  personal: "Firefox/Chrome Addon: Tab Explorer, Snake made with Unity Engine, Flappy bird during Hackathon, Linux fully dynamic rice(where my terminal love began), etc...",
  projects: "Built websites for: Avene, Ascendum, Banco De Portugal, Banco Economico, Eu Sou Digital, Luso, Minipreco, Mudar E Ganhar, Portugal Clinical Trials, Portugal Digital Summit, Parques de Sintra, Sagres, and many more...",
  contact: "Email me @ hello@joaopacheco.me",
  clear: "",
  hello: "world!",
  tecnologies: "C#, .NET, JAVA, NodeJS, SQL, GIT, Azure, Umbraco, etc..",
  spin: "spinner",
  cat: catAsciiArt,
  rat: ratAsciiArt,
  ls: "these are not the files you are looking for",
  neofetch: () => { showNeofetch(); }
};

function showNeofetch() {
  const asciiArt = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠘⢦⠀⠀⠀⠀⠀⠀⠀⠀⢠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢳⡀⠀⠀⠀⠀⠀⣠⣾⠙⢦⣀⠀⠀⠀⠀⠀⠀⠀⢀⣠⠔⠂
⠀⠀⠀⠀⠀⠀⠀⢸⡿⣗⡲⠶⠖⠋⣡⣯⡀⠀⠈⠉⠓⠒⠲⢶⣶⡖⠋⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⡼⠁⡿⢯⠙⠛⠋⣹⡇⠙⠲⢤⣀⣀⡤⠖⢫⠏⠀⠀⠀⠀⠀
⠈⠙⠓⠶⢤⣴⣋⢀⣰⠃⠈⣿⡛⠉⣽⠙⠲⢤⡤⠞⢻⠀⢀⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢯⡙⢳⡲⢴⣇⣙⣄⣇⡤⠚⠉⡇⠀⢸⠀⢸⡇⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣷⠀⣧⠀⣇⡼⢻⢿⡲⠤⣄⣧⠀⠸⡆⠈⣧⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⡇⣠⣿⡊⠙⢦⡞⠀⠳⣴⠋⠉⢉⡷⠿⠤⣌⣦⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⢾⣋⠁⠀⠙⢦⢸⡟⠉⠉⠙⣆⢠⠏⣠⠖⠋⠉⠉⠉⠓⠲⠤⡄
⠀⠀⣠⠖⠋⠁⠀⠈⠙⠦⡀⠈⣿⣠⠤⠴⠶⠾⢿⣠⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣆⡏⠀⠀⢀⣀⣀⣀⣻⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡷⠚⠉⠉⠁⠀⠀⠀⠙⣆⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`;

  const info = `
joaopacheco@myterminal
OS: Arch btw
Shell: zsh
WM: i3-gaps
Uptime: 13 minutes and 37 seconds
Resolution: 8k @ 400hz
Packages: 9000+
Memory: 24GB/200PB                         
┬│┬──┐┬─┐┌┬┐
│││┌─┘├┬┘│││
└┴┘└──┴└──┴┘
`;

  const container = document.createElement("div");
  container.classList.add("output");
  container.classList.add("neofetch");
  container.style.alignItems = "flex-start";
  container.style.gap = "2em";
  container.style.whiteSpace = "pre";

  const artDiv = document.createElement("div");
  container.appendChild(artDiv);
  typeWriter(asciiArt, artDiv, 15);

  const infoDiv = document.createElement("div");
  container.appendChild(infoDiv);
  typeWriter(info, infoDiv);

  document.getElementById("output").appendChild(container);
}

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

function startPlaceholderTyping() {
  if (input.textContent.trim() !== "" || document.activeElement === input) return;

  isTyping = true;
  input.classList.add("placeholder");

  placeholderInterval = setInterval(() => {
    if (placeholderIndex < placeholderText.length) {
      input.textContent += placeholderText.charAt(placeholderIndex);
      placeholderIndex++;
    } else {
      clearInterval(placeholderInterval);
      setTimeout(() => {
        input.textContent = "";
        placeholderIndex = 0;
        startPlaceholderTyping();
      }, 2000);
    }
  }, 100);
}

function stopPlaceholderTyping() {
  if (!isTyping) return;
  clearInterval(placeholderInterval);
  input.textContent = "";
  input.classList.remove("placeholder");
  placeholderIndex = 0;
  isTyping = false;
}

// Start typing when not focused
startPlaceholderTyping();

input.addEventListener("focus", stopPlaceholderTyping);
input.addEventListener("blur", () => {
  if (input.textContent.trim() === "") startPlaceholderTyping();
});
input.addEventListener("input", () => {
  if (input.textContent.trim() !== "") stopPlaceholderTyping();
});

//Refocus terminal on typing
document.addEventListener("keydown", (e) => {
  // Ignore if already focused
  if (document.activeElement === input) return;

  // Prevent default so keys don't scroll the page
  e.preventDefault();

  // Focus the terminal input
  input.focus();

  // Optionally insert the key the user pressed
  // (Skip special keys like Shift, Control, etc.)
  if (e.key.length === 1) {
    stopPlaceholderTyping(); // remove placeholder if running
    input.textContent = e.key;
    placeCaretAtEnd(input);
  }
});

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
    }
    else if (cmd === "neofetch") {
      commands.neofetch();
    }
    else if (commands[cmd]) {
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
      placeCaretAtEnd(input);
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

  if (e.key === "Tab") {
    const cmd = input.textContent.trim().toLowerCase();
    if (cmd.length) {
      for (key in commands) { 
        if(key.startsWith(cmd)){
          console.log(key.startsWith(cmd))
          input.textContent = key;
          placeCaretAtEnd(input);
        }
    }
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

const terminal = document.getElementById("terminal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

terminal.addEventListener("click", () => {
  document.getElementById("command-input").focus();
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//HANDLE TERMINAL DRAG
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