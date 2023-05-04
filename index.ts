#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from 'chalk-animation';

const sleep=()=>new Promise((resolve)=>setTimeout((resolve),2000));

async function welcomeScreen(){
    let title=chalkAnimation.rainbow(`
=======================================================================
>>>>>>>>>>>>>>>>>>>>>>>>> Number Guess Game <<<<<<<<<<<<<<<<<<<<<<<<<<<
=======================================================================
    `)
    await sleep();
    title.stop();
}
await welcomeScreen();

const main = async () => {

    let condition = true;
    
    while (condition) {
        const computerNumber = Math.floor(Math.random() * 10) + 1;
        const userNumber = await inquirer.prompt([
            {
                type: "number",
                name: "num",
                message: "please enter number between 1 to 10",
                validate:(answer)=>{
                    if(isNaN(answer)){
                        return "enter a right value"
                    };
                    return true;
                }
            }
        ]);
        if (computerNumber === userNumber.num) {
            
            console.log(chalk.green(`you win.your guess is right`));

            condition = false;
        } else if (userNumber.num > computerNumber) {
            console.log(chalk.magentaBright("your guess is high"));
        } else if (userNumber.num < computerNumber) {
            console.log(chalk.redBright("your guess is low"));
        };

    };
};

let again = true;

do {

    await main();
    const againplay = await inquirer.prompt([
        {
            type: "confirm",
            name: "reapet",
            message: "play again Game:"
        }
    ]);
    again = againplay.reapet;
} while (again);

