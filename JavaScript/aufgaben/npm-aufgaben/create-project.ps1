# Setze den Projektname und den Basisordner
$projectName = "product-management-system"
$baseDir = "C:\Users\winte\Documents\GitHub\uni-html-css\JavaScript\aufgaben\npm-aufgaben"

# Erstelle das Hauptverzeichnis für das Projekt
$projectPath = Join-Path -Path $baseDir -ChildPath $projectName
New-Item -Path $projectPath -ItemType Directory -Force

# Erstelle die src-Ordnerstruktur
$srcDir = Join-Path -Path $projectPath -ChildPath "src"
New-Item -Path $srcDir -ItemType Directory -Force

# Erstelle die tsconfig.json Datei
$tsconfigContent = @"
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
"@
$tsconfigPath = Join-Path -Path $projectPath -ChildPath "tsconfig.json"
Set-Content -Path $tsconfigPath -Value $tsconfigContent

# Erstelle die package.json Datei
$packageJsonContent = @"
{
  "name": "product-management-system",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  },
  "dependencies": {}
}
"@
$packageJsonPath = Join-Path -Path $projectPath -ChildPath "package.json"
Set-Content -Path $packageJsonPath -Value $packageJsonContent

# Erstelle die product.ts Datei
$productTsContent = @"
export type Product = {
  id: string;
  name: string;
  price: number;
};

export const products: Product[] = [
  { id: "1", name: "Laptop", price: 999.99 },
  { id: "2", name: "Smartphone", price: 599.99 },
  { id: "3", name: "Headphones", price: 199.99 },
];
"@
$productTsPath = Join-Path -Path $srcDir -ChildPath "product.ts"
Set-Content -Path $productTsPath -Value $productTsContent

# Erstelle die getProductInfo.ts Datei
$getProductInfoTsContent = @"
import { products, Product } from "./product";

export function getProductInfo(input: string): Product | number {
  const productById = products.find(product => product.id === input);

  if (productById) {
    return productById;
  }

  const productByName = products.find(product => product.name.toLowerCase() === input.toLowerCase());

  if (productByName) {
    return productByName.price;
  }

  throw new Error("Produkt nicht gefunden");
}
"@
$getProductInfoTsPath = Join-Path -Path $srcDir -ChildPath "getProductInfo.ts"
Set-Content -Path $getProductInfoTsPath -Value $getProductInfoTsContent

# Erstelle die index.ts Datei
$indexTsContent = @"
import { getProductInfo } from "./getProductInfo";

try {
  const product1 = getProductInfo("1");
  console.log("Produkt 1:", product1);

  const price = getProductInfo("Smartphone");
  console.log("Preis des Smartphones:", price);
} catch (error) {
  console.error(error.message);
}
"@
$indexTsPath = Join-Path -Path $srcDir -ChildPath "index.ts"
Set-Content -Path $indexTsPath -Value $indexTsContent

Write-Host "Projektstruktur für $projectName wurde erstellt!"
