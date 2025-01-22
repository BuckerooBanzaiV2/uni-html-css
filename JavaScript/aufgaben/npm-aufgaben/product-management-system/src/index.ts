import * as readline from "readline";
import { getProductInfo } from "./getProductInfo";

// Erstelle das readline Interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funktion, die den Benutzer fragt und das Produkt basierend auf der Eingabe sucht
function askUserForProductInfo() {
  rl.question("Bitte geben Sie die Produkt-ID oder den Produktnamen ein: ", (input: string) => { // Hier den Typ des Parameters 'input' spezifizieren
    try {
      // Versuchen, das Produkt zu bekommen
      const result = getProductInfo(input);
      
      // Ausgabe je nach Eingabetyp
      if (typeof result === 'object') {
        console.log("Produkt gefunden:", result);
      } else {
        console.log("Preis:", result);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Fehler:", error.message);
      } else {
        console.error("Ein unbekannter Fehler ist aufgetreten");
      }
    }
    
    // Schließe das readline Interface
    rl.close();
  });
}

// Aufruf der Funktion
askUserForProductInfo();
