"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const getProductInfo_1 = require("./getProductInfo");
// Erstelle das readline Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Funktion, die den Benutzer fragt und das Produkt basierend auf der Eingabe sucht
function askUserForProductInfo() {
    rl.question("Bitte geben Sie die Produkt-ID oder den Produktnamen ein: ", (input) => {
        try {
            // Versuchen, das Produkt zu bekommen
            const result = (0, getProductInfo_1.getProductInfo)(input);
            // Ausgabe je nach Eingabetyp
            if (typeof result === 'object') {
                console.log("Produkt gefunden:", result);
            }
            else {
                console.log("Preis:", result);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Fehler:", error.message);
            }
            else {
                console.error("Ein unbekannter Fehler ist aufgetreten");
            }
        }
        // Schließe das readline Interface
        rl.close();
    });
}
// Aufruf der Funktion
askUserForProductInfo();
