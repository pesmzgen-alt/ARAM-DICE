const palette = [
  {name:"Red", color:"#f1263e"}, {name:"Orange", color:"#ff9900"},
  {name:"Yellow", color:"#ffd400"}, {name:"Green", color:"#078b25"},
  {name:"Blue", color:"#172cff"}, {name:"Purple", color:"#861bdb"}
];
const diceArea = document.getElementById("diceArea");
const result = document.getElementById("rollResult");
const countSelect = document.getElementById("diceCount");
const modeSelect = document.getElementById("diceMode");
function rollDice(){
  const count = Number(countSelect.value);
  const mode = modeSelect.value;
  const picks = [];
  diceArea.innerHTML = "";
  for(let i=0;i<count;i++){
    const pick = mode === "color" ? palette[Math.floor(Math.random()*palette.length)] : null;
    const number = Math.floor(Math.random()*6)+1;
    const die = document.createElement("div");
    die.className = "die" + (mode === "number" ? " number" : "");
    die.style.setProperty("--die", pick ? pick.color : "#1762d9");
    die.style.animationDelay = `${i*70}ms`;
    if(mode === "color"){
      die.innerHTML = '<span class="pip"></span>';
      picks.push(pick.name);
    }else{
      die.textContent = number;
      picks.push(number);
    }
    diceArea.appendChild(die);
  }
  result.textContent = mode === "color" ? `YOUR COLORS: ${picks.join(" • ").toUpperCase()}` : `YOUR NUMBERS: ${picks.join(" • ")}`;
}
document.getElementById("rollButton").addEventListener("click",rollDice);
countSelect.addEventListener("change",rollDice);
modeSelect.addEventListener("change",rollDice);
const signButtons = [...document.querySelectorAll(".sign")];
function chooseSign(name){
  document.getElementById("chosenSign").innerHTML = `<span>YOUR SIGN</span><strong>${name.toUpperCase()}</strong><small>That's your move. Good luck!</small>`;
  signButtons.forEach(b=>b.classList.toggle("selected",b.dataset.sign===name));
}
signButtons.forEach(button=>button.addEventListener("click",()=>chooseSign(button.dataset.sign)));
document.getElementById("randomSign").addEventListener("click",()=>{
  const item=signButtons[Math.floor(Math.random()*signButtons.length)];
  chooseSign(item.dataset.sign);
});
rollDice();