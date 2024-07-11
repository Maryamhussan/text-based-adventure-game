#!/usr/bin/env node
import inquirer from "inquirer";
let enemies = ["Monster", "Dragon", "Zombie", "Snake"];
let maxEnemyHealth = 100;
let enemyAttackDamage = 25;
let maxPlayerHealth = 100;
let minPlayerHealth = 0;
let playerAttackDamage = 30;
let healthPotions = 3;
let healingAmount = 30;
let potionChance = 50;
let enemiesDefeated = 0;
let randomNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
async function method() {
    console.log("\t=======================================");
    console.log("\t\tWelcome To The Dungeon!");
    console.log("\t=======================================\n");
    let player = await inquirer.prompt([
        {
            name: "player1",
            type: "input",
            message: "Please enter your name:"
        }
    ]);
    let playerName = player.player1;
    if (playerName) {
        let start = await inquirer.prompt([
            {
                name: "confirmStart",
                type: "confirm",
                message: "Do you want to start the game?"
            }
        ]);
        if (start.confirmStart) {
            GAME: while (true) {
                let enemyHealth = randomNumber(maxEnemyHealth);
                let enemy = enemies[randomNumber(enemies.length - 1)];
                console.log("\t=======================================");
                console.log(`\t\tA ${enemy} has appeared!`);
                console.log("\t=======================================\n");
                console.log(`\tYour HP = ${maxPlayerHealth}`);
                console.log(`\t${enemy}'s HP = ${enemyHealth}\n`);
                while (enemyHealth > 0) {
                    let userInput = await inquirer.prompt([
                        {
                            name: "input",
                            type: "list",
                            message: "\tWhat would you like to do:",
                            choices: ["\tHome", "\tAttack", "\tDrink Health Potion", "\tRun", "\tView Player's Profile", "\tView Enemy's Profile", "\tExit"]
                        }
                    ]);
                    switch (userInput.input) {
                        case "\tHome":
                            let rename = await inquirer.prompt([
                                {
                                    name: "player1",
                                    type: "confirm",
                                    message: "Do You Want To Change The Player's name:"
                                }
                            ]);
                            //console.log(rename.player1)
                            if (rename.player1) {
                                player = await inquirer.prompt([
                                    {
                                        name: "player1",
                                        type: "input",
                                        message: "Please enter the player's name:"
                                    }
                                ]);
                                playerName = player.player1;
                            }
                            else {
                                let homeStart = await inquirer.prompt([
                                    {
                                        name: "confirmStart",
                                        type: "confirm",
                                        message: "Do you want to start the game?"
                                    }
                                ]);
                                if (!homeStart.confirmStart) {
                                    console.log("\t=======================================");
                                    console.log("\t\t##THANKS FOR PLAYING!##");
                                    console.log("\t=======================================");
                                    console.log(`\tExiting the game...`);
                                    return;
                                }
                                break;
                            }
                        case "\tAttack":
                            let attackDamage = randomNumber(playerAttackDamage, 1);
                            let damageTaken = randomNumber(enemyAttackDamage, 1);
                            enemyHealth -= attackDamage;
                            maxPlayerHealth -= damageTaken;
                            console.log(`\n\tYou struck the ${enemy} with damage = ${attackDamage}`);
                            console.log(`\tYou received damage = ${damageTaken}  from the ${enemy}\n`);
                            if (maxPlayerHealth <= minPlayerHealth) {
                                console.log(`\n\tYou have taken too much damage, you are too weak to go on.`);
                                break GAME;
                            }
                            break;
                        case "\tDrink Health Potion":
                            if (healthPotions > 0) {
                                maxPlayerHealth += healingAmount;
                                healthPotions -= 1;
                                console.log(`\n\tYou drank the Health Potion, healing yourself for ${healingAmount} HP.
\tYou now have ${maxPlayerHealth} HP.
\tYou now have ${healthPotions} potions left.\n`);
                            }
                            else {
                                console.log(`\n\tYou have no health potions left. Defeat enemies for a chance to get one.\n`);
                            }
                            break;
                        case "\tRun":
                            console.log(`\n\t!!!You ran away from the ${enemy}!!!\n`);
                            //   console.log(`\tYou ran away from the ${enemy}\n`);
                            let control = await inquirer.prompt([
                                {
                                    name: "control",
                                    type: "list",
                                    message: "What would you like to do:",
                                    choices: ["Continue the game", "Exit"]
                                }
                            ]);
                            if (control.control === "Continue the game") {
                                console.log("\n\t[You can continue your adventure!]");
                                continue GAME;
                            }
                            else {
                                console.log("\t=======================================");
                                console.log("\t\t##THANKS FOR PLAYING!##");
                                console.log("\t=======================================");
                                console.log(`\n\tExiting the game...`);
                                process.exit();
                            }
                        case "\tView Player's Profile":
                            console.log(`\t=======================================`);
                            console.log(`\tName:${playerName}`);
                            console.log(`\tHP: ${maxPlayerHealth}`);
                            console.log(`\tHealth Potions: ${healthPotions}`);
                            console.log(`\tEnemies Defeated: ${enemiesDefeated}`);
                            console.log(`\t=======================================\n`);
                            break;
                        case "\tView Enemy's Profile":
                            console.log(`\t=======================================`);
                            console.log(`\tName:${enemy}`);
                            console.log(`\tHP: ${enemyHealth}`);
                            //console.log(`\tHealth Potions: ${healthPotions}`);
                            //console.log(`\tEnemies Defeated: ${enemiesDefeated}`);
                            console.log(`\t=======================================\n`);
                            break;
                        case "\tExit":
                            console.log("\t=======================================");
                            console.log("\t\t##THANKS FOR PLAYING!##");
                            console.log("\t=======================================");
                            console.log(`\tExiting the game...`);
                            return;
                    }
                }
                enemiesDefeated++;
                console.log("\t=========================================");
                console.log(`\t${enemy} has been defeated`);
                console.log("\t=========================================");
                console.log(`\n\t[You have ${maxPlayerHealth} HP left.]\n`);
                if (randomNumber(100) < potionChance) {
                    healthPotions++;
                    console.log(`\n\t${enemy} dropped a health potion.`);
                    console.log(`\tYou now have ${healthPotions} health potions left.\n`);
                }
                let control = await inquirer.prompt([
                    {
                        name: "control",
                        type: "list",
                        message: "What would you like to do:",
                        choices: ["Continue the game", "Exit"]
                    }
                ]);
                if (control.control === "Continue the game") {
                    console.log("\n\t[You can continue your adventure!]\n");
                }
                else {
                    console.log("\t=======================================");
                    console.log(`\t\tExiting the game...`);
                    break;
                }
            }
            if (maxPlayerHealth <= minPlayerHealth) {
                console.log("\t====================================================");
                console.log("\tYou limped out of the dungeon, weak from the battle.");
                console.log("\t====================================================");
            }
        }
    }
    console.log("\t=======================================");
    console.log("\t\t##THANKS FOR PLAYING!##");
    console.log("\t=======================================");
}
method();
