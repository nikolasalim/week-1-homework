const hero = {
  name: "",
  heroic: true,
  inventory: [],
  health: 10,
  weapon: { type: "", damage: 2 }
};

const enemy = {
  name: "",
  health: 10,
  weapon: { type: "", damage: 2 }
};

//// Rest – if player's health is lower than 10, reassign it back to 10;

const restBtn = document.getElementById("inn");

const rest = person => {
  if (person.health < 10) {
    person.health = 10;
    displayingStats(hero);
  } else {
    !person.name
      ? alert(`Your health is already full`)
      : alert(`${person.name}, your health is already full`);
  }
  return person;
};

restBtn.addEventListener("click", e => {
  rest(hero);
});

//// Pick up item – picks up a specific item and makes it the last item on the inventory;

const pickUpItemBtn = document.getElementById("dagger");
const dagger = { type: "dagger", damage: 2 };

const pickUpItem = (person, weapon) => {
  person.inventory.push(weapon);
  console.log(person);
};

pickUpItemBtn.addEventListener("click", e => {
  pickUpItem(hero, dagger);
});

//// Equip weapon – takes the first weapon on inventory and moves it to the 'weapon' slot;

const equipWeaponBtn = document.getElementById("bag");

const equipWeapon = person => {
  if (person.inventory === undefined || person.inventory.length === 0) {
    console.log(`Inventory's empty!`);
  } else {
    const currentItem = person.weapon;
    person.inventory.push(currentItem);
    person.weapon = person.inventory.shift();
    person.inventory.splice(0, 1, currentItem);

    displayingStats(person);
    // console.log(person);
  }
};

equipWeaponBtn.addEventListener("click", e => {
  equipWeapon(hero);
});

//// Change name – changes name on the object and displays it on the screen;

const submitName = person => {
  const nameInput = document.getElementById("nameInput");
  const newName = nameInput.value;
  !newName
    ? alert("Please, fill in your name")
    : console.log("name input value:", nameInput.value);
  // console.log("newName:", newName);
  person.name = newName;
  // console.log(`Your name is now ${person.name}.`);
  console.log(hero);

  displayingStats(person);

  nameInput.value = null;
};

const nameBtn = document.getElementById("nameBtn");

nameBtn.addEventListener("click", e => {
  submitName(hero);
});

//// Displaying player's current stats

let displayedName = document.getElementById("displayedName");
let displayedHealth = document.getElementById("displayedHealth");
let displayedWeapon = document.getElementById("displayedWeapon");

const displayingStats = person => {
  !person.name
    ? (displayedName.innerText = "–")
    : (displayedName.innerText = `Name: ${person.name}`);
  displayedHealth.innerText = `HP: ${person.health}`;
  !person.weapon.type
    ? (displayedWeapon.innerText = "Weapon: bare hands")
    : (displayedWeapon.innerText = `Weapon: ${person.weapon.type} (dmg: ${person.weapon.damage})`);
};

displayingStats(hero);

//// 'Pick a Fight' mode – generates random weapons and HP for you and an enemy – wins who deals more damage;

// Objects for 'Pick a Fight' mode:
const weaponsList = [
  { type: "Water gun", damage: 0 },
  { type: "Last week hard baguette", damage: 1 },
  { type: "Broken bottle", damage: 1 },
  { type: "Extremly firm handshake", damage: 2 },
  { type: "Shuriken", damage: 3 },
  { type: "Dagger", damage: 4 },
  { type: "Arnold Schwarzenegger", damage: 4 },
  { type: "Sword", damage: 5 },
  { type: "Spear", damage: 6 },
  { type: "Hand granade", damage: 7 },
  { type: "Invisible powerful weapon", damage: 8 },
  { type: "Bazooka", damage: 9 },
  {
    type:
      "The 'Developer With An Independent And Strong Growth Mindset' Fist Punch",
    damage: 9
  },
  { type: "Chuck Norris", damage: 10 }
];

const namesList = [
  // Fun fact: The namesList is based on an introduction game we had on our first day, where everyone could choose their own funny 'pre-name nickname'.
  "Chaotic Kelly",
  "Ninja Niko",
  "Majestic Moranta",
  "Steady Sebastiaan",
  "Soft Sofia",
  "Giant Jayant",
  "Nice Nick",
  "Gentle John"
];

const pickFightBtn = document.getElementById("pickFight");

// 'Pick a Fight' functionality:

const pickFight = person => {
  // Generating random values for name, hp and weapon;

  const randomHP = Math.floor(Math.random() * 11);

  const generateRandomWeapon = listOfWeapons => {
    const randomIndex = Math.floor(Math.random() * listOfWeapons.length);
    return listOfWeapons[randomIndex];
  };

  const generateRandomName = listOfNames => {
    const randomIndex = Math.floor(Math.random() * listOfNames.length);
    return listOfNames[randomIndex];
  };

  person.health = randomHP;
  person.weapon = generateRandomWeapon(weaponsList);

  // Generating enemies

  const enemyName = document.getElementById("enemyName");
  const enemyHealth = document.getElementById("enemyHealth");
  const enemyWeapon = document.getElementById("enemyWeapon");

  enemy.name = generateRandomName(namesList);
  enemy.health = randomHP;
  enemy.weapon = generateRandomWeapon(weaponsList);

  enemyName.innerText = `Name: ${enemy.name}`;
  enemyHealth.innerText = `HP: ${enemy.health}`;
  enemyWeapon.innerText = `Weapon: ${enemy.weapon.type} (dmg: ${enemy.weapon.damage})`;

  // Winning logic

  const YouWin =
    person.health + person.weapon.damage > enemy.health + enemy.weapon.damage;
  const CPUWins =
    person.health + person.weapon.damage < enemy.health + enemy.weapon.damage;

  const scoreboardMessage = document.getElementById("message");
  let youPoints = document.getElementById("youPoints");
  let CPUPoints = document.getElementById("CPUPoints");

  if (YouWin) {
    scoreboardMessage.innerText = `You WIN! You had ${person.health +
      person.weapon
        .damage} HP and damage points, while your enemy had only ${enemy.health +
      enemy.weapon.damage}`;
    youPoints.innerText++;
  } else if (CPUWins) {
    scoreboardMessage.innerText = `You LOSE! Your enemy had ${enemy.health +
      enemy.weapon
        .damage} HP and damage points, while you had only ${person.health +
      person.weapon.damage}`;
    CPUPoints.innerText++;
  } else {
    scoreboardMessage.innerText = `It's a TIE! Both you and your enemy had ${enemy.health +
      enemy.weapon.damage} HP and damage points`;
    CPUPoints.innerText++;
    youPoints.innerText++;
  }
  displayingStats(person);
};

// Button to reset the scoreboard:

const resetScoreboardBtn = document.getElementById("resetScoreboard");
resetScoreboardBtn.addEventListener("click", e => {
  CPUPoints.innerText = 0;
  youPoints.innerText = 0;
});

pickFightBtn.addEventListener("click", e => {
  pickFight(hero);
  document.getElementById("CPUBox").style.display = "flex";
});

/* I COULDN'T MAKE THIS FEATURE WORK IN TIME :-(


  //// reaction speed test mode  – generates enemies in random places of the screen

// console.log(randomHeight);
// console.log(randomWidth);

let randomBtnIsOn = false;

const randomPosition = () => {
  // randomBtnIsOn = true;
  // if (!randomBtnIsOn) {
  setInterval(() => {
    if (randomBtnIsOn) {
      // creating the dragon
      const screen = document.getElementById("screen");
      const dragon = document.createElement("img");
      screen.appendChild(dragon);
      dragon.classList.add("dragon");

      // styling the dragon
      dragon.setAttribute("src", "./media/dragon.jpg");
      dragon.style.position = "absolute";
      dragon.style.width = "100px";
      dragon.style.zIndex = 0;

      // positioning the dragon
      const randomWidth = Math.abs(
        Math.floor(Math.random() * window.innerWidth - 100)
      );
      const randomHeight = Math.abs(
        Math.floor(Math.random() * window.innerHeight - 100)
      );

      dragon.style.top = randomHeight;
      dragon.style.left = randomWidth;

      setTimeout(() => {
        screen.removeChild(dragon);
      }, 599);
    } else {
      screen.removeChild(dragon);
    }
  }, 600);
  // } else {
  //   return;
  // }
};

reactionTest.addEventListener("click", e => {
  if (randomBtnIsOn === false) {
    randomPosition();
    randomBtnIsOn = true;
  } else {
    clearInterval(randomPosition);
    randomBtnIsOn = false;
  }
}); */

////////////////////////////////////////////// TICKS ALL TESTS :) //////////////////////////////////////////////////

/* const hero = {
  name: "magda",
  heroic: true,
  inventory: [],
  health: 10,
  weapon: { type: "", damage: 2 }
};

// console.log(`old health in the global scope: ${hero.health}`);

console.log(hero);

//rest function

const restBtn = document.getElementById("inn");

const rest = person => {
  console.log(`old health inside rest function: ${person.health}`);
  person.health < 10
    ? (person.health = 10)
    : alert(`${person.name}, your health is already full`);
  console.log(`new health inside rest function: ${person.health}`);
  return person;
};

// restBtn.addEventListener("click", rest);

restBtn.addEventListener("click", e => {
  rest(hero);
});

const pickUpItemBtn = document.getElementById("dagger");

// console.log("hero inventory:", hero.inventory);

const dagger = { type: "dagger", damage: 2 };
// const sword = { type: "sword", damage: 5 };
// const spear = { type: "spear", damage: 7 };

const pickUpItem = (person, weapon) => {
  person.inventory.push(weapon);
  // for (i = 0; i < person.inventory.length; i++) {
  //   const everyItemInventory = person.inventory[i];
  //   console.log(`${person.name}, you've just picked up ${weapon.type}!`);
  //   console.log(everyItemInventory);
  // }
};

pickUpItemBtn.addEventListener("click", e => {
  pickUpItem(hero, dagger);
  // pickUpItem(hero, sword);
  // pickUpItem(hero, spear);
});

// equip weapon function

const equipWeaponBtn = document.getElementById("bag");

const equipWeapon = person => {
  console.log(person.inventory);

  if (person.inventory === undefined || person.inventory.length === 0) {
    console.log(`Inventory's empty!`);
  } else {
    person.weapon = person.inventory.shift();
    // const firstItem = person.inventory.shift();
    // console.log(firstItem);

    person.inventory.push(person.weapon);

    // console.log(person.inventory);
  }
};

equipWeaponBtn.addEventListener("click", e => {
  equipWeapon(hero);
  // console.log(hero);
}); */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const hero = {
//   name: "Link",
//   heroic: true,
//   inventory: [],
//   health: 10,
//   weapon: { type: "Spear", damage: 2 }
// };

// //// rest – if player's health is lower than 10, reassign it back to 10;

// const restBtn = document.getElementById("inn");

// const rest = person => {
//   person.health < 10
//     ? (person.health = 10)
//     : alert(`${person.name}, your health is already full`);
//   return person;
// };

// restBtn.addEventListener("click", e => {
//   rest(hero);
// });

// //// pick up item – picks up a specific item and makes it the last item on the inventory;

// const pickUpItemBtn = document.getElementById("dagger");

// const dagger = { type: "dagger", damage: 2 };
// // const sword = { type: "sword", damage: 5 };
// // const spear = { type: "spear", damage: 7 };

// const pickUpItem = (person, weapon) => {
//   person.inventory.push(weapon);
//   console.log(person);
// };

// pickUpItemBtn.addEventListener("click", e => {
//   pickUpItem(hero, dagger);
//   // pickUpItem(hero, sword);
//   // pickUpItem(hero, spear);
// });

// //// equip weapon – takes the first weapon on inventory and moves it to the 'weapon' slot;

// const equipWeaponBtn = document.getElementById("bag");

// const equipWeapon = person => {
//   if (person.inventory === undefined || person.inventory.length === 0) {
//     console.log(`Inventory's empty!`);
//   } else {
//     /* mudança – deletar se der merda*/
//     const currentItem = person.weapon;
//     person.inventory.push(currentItem);
//     /* até aqui */
//     person.weapon = person.inventory.shift();

//     // person.inventory.push(person.weapon);
//     person.inventory.splice(0, 1, currentItem);

//     // displayedWeapon.innerText = `Weapon: ${person.weapon.type} (dmg: ${person.weapon.damage})`;
//     displayingStats(person);
//     console.log(person);
//   }
// };

// equipWeaponBtn.addEventListener("click", e => {
//   equipWeapon(hero);
// });

// //// change name – changes name on the object and displays it on the screen;

// // const displayedName = document.getElementById("displayedName");
// // displayedName.innerText = `Name: ${hero.name}`;

// const submitName = person => {
//   const nameInput = document.getElementById("nameInput");
//   const newName = nameInput.value;
//   !newName
//     ? alert("Please, fill in your name")
//     : console.log("name input value:", nameInput.value);
//   console.log("newName:", newName);
//   person.name = newName;
//   console.log(`Your name is now ${person.name}.`);
//   console.log(hero);

//   // displayedName.innerText = `Name: ${hero.name}`;
//   displayingStats(person);

//   nameInput.value = null;
// };

// const nameBtn = document.getElementById("nameBtn");

// nameBtn.addEventListener("click", e => {
//   submitName(hero);
// });

// //// displaying player's current stats

// let displayedName = document.getElementById("displayedName");
// let displayedHealth = document.getElementById("displayedHealth");
// let displayedWeapon = document.getElementById("displayedWeapon");

// const displayingStats = person => {
//   !person.name
//     ? (displayedName.innerText = "–")
//     : (displayedName.innerText = `Name: ${person.name}`);
//   displayedHealth.innerText = `HP: ${person.health}`;
//   !person.weapon.type
//     ? (displayedWeapon.innerText = "Weapon: bare hands")
//     : (displayedWeapon.innerText = `Weapon: ${person.weapon.type} (dmg: ${person.weapon.damage})`);
// };

// displayingStats(hero);
