import { isDHBW } from 'is-dhbw';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

try {
  const userInput = await rl.question("Bitte gib etwas ein: ");
  console.log(`${userInput} ist ${isDHBW(userInput) ? 'true' : 'false'}`);
} catch (error) {
  console.error("Es ist ein Fehler aufgetreten:", error);
} finally {
  rl.close();
}
