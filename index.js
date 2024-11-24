// const tf = require('@tensorflow/tfjs-node');
// const fs = require('fs');
// const path = require('path');

// let model;

// async function loadModel() {
//     try {
//         const modelPath = path.resolve(__dirname, './Colab-Notebooks/taylor_swift_js/model.json');
//         model = await tf.loadLayersModel(`file://${modelPath}`);
//         console.log(model.summary());
//     } catch (error) {
//         console.error('Error loading the model:', error);
//     }
// }

// function loadTextFile(filePath) {
//     try {
//         const absolutePath = path.resolve(__dirname, filePath);
//         console.log('Reading file:', absolutePath);
//         const fileBuffer = fs.readFileSync(absolutePath);
//         const text = fileBuffer.toString('utf-8');
//         return text;
//     } catch (error) {
//         console.error('Error reading the file:', error);
//         return null;
//     }
// }

// const text = loadTextFile('Colab-Notebooks/choruses.txt');
// if (!text) {
//     console.error('No text loaded, exiting.');
//     return;
// }

// const vocab = Array.from(new Set(text.split(""))).sort();

// const char2idx = {};
// const idx2char = {};

// vocab.forEach((char, index) => {
//     char2idx[char] = index;
//     idx2char[index] = char;
// });

// console.log("char2idx:", char2idx);
// console.log("idx2char:", idx2char);

// async function generateText(model, startString, temperature = 1.0) {
//     const numGenerate = 300;

//     // Convert startString to character indices
//     const inputEval = startString.split("").map(char => {
//         if (char in char2idx) {
//             return char2idx[char];
//         } else {
//             console.warn(`Character '${char}' not in char2idx mapping, defaulting to space.`);
//             return char2idx[' '];
//         }
//     });

//     let inputTensor = tf.tensor([inputEval]);
//     const textGenerated = [];

//     // Reset states for stateful layers
//     model.layers.forEach(layer => {
//         if (layer.resetStates) {
//             try {
//                 layer.resetStates();
//             } catch (err) {
//                 console.warn(`Error resetting states for layer: ${err.message}`);
//             }
//         }
//     });

//     for (let i = 0; i < numGenerate; i++) {
//         // Generate predictions
//         let predictions = model.predict(inputTensor);

//         // Remove batch dimension and apply temperature scaling
//         predictions = tf.squeeze(predictions, 0).div(temperature).softmax();

//         // Sample the next character's index
//         const predictedIdTensor = tf.multinomial(predictions, 1);
//         const predictedId = (await predictedIdTensor.data())[0];
//         predictedIdTensor.dispose();

//         if (!(predictedId in idx2char)) {
//             console.error(`Predicted index '${predictedId}' out of bounds.`);
//             break;
//         }

//         // Append the character to the result
//         textGenerated.push(idx2char[predictedId]);

//         // Update input sequence
//         inputTensor = tf.tensor([[predictedId]]);
//     }

//     return startString + textGenerated.join('');
// }

// async function main() {
//     await loadModel();

//     const startString = "Call me";
//     const temperature = 1.0;

//     if (!model) {
//         console.error('Model not loaded yet');
//         return;
//     }

//     const generatedText = await generateText(model, startString, temperature);
//     console.log(generatedText);
// }

// main();

const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

let model;

async function loadModel() {
  try {
    const modelPath = path.resolve(
      __dirname,
      "./Colab-Notebooks/taylor_swift_js/model.json"
    );
    model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded successfully.");
    model.compile( { loss: 'sparseCategoricalCrossentropy', optimizer: 'adam' } );
    model.summary();
  } catch (error) {
    console.error("Error loading the model:", error);
  }
}

function loadTextFile(filePath) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    console.log("Reading file:", absolutePath);
    const fileBuffer = fs.readFileSync(absolutePath);
    return fileBuffer.toString("utf-8");
  } catch (error) {
    console.error("Error reading the file:", error);
    return null;
  }
}

const text = loadTextFile("Colab-Notebooks/choruses.txt");
if (!text) {
  console.error("No text loaded, exiting.");
  process.exit(1);
}

// const vocab = Array.from(new Set(text.split(""))).sort();
const vocab = [
  "\n",
  "\r",
  " ",
  "!",
  '"',
  "'",
  "(",
  ")",
  ",",
  "-",
  ".",
  "0",
  "1",
  "2",
  "3",
  "6",
  "9",
  ":",
  "?",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "—",
  "‘",
  "’",
  "…",
];

const char2idx = {
  "\n": 0,
  "\r": 1,
  " ": 2,
  "!": 3,
  '"': 4,
  "'": 5,
  "(": 6,
  ")": 7,
  ",": 8,
  "-": 9,
  ".": 10,
  0: 11,
  1: 12,
  2: 13,
  3: 14,
  6: 15,
  9: 16,
  ":": 17,
  "?": 18,
  A: 19,
  B: 20,
  C: 21,
  D: 22,
  E: 23,
  F: 24,
  G: 25,
  H: 26,
  I: 27,
  J: 28,
  K: 29,
  L: 30,
  M: 31,
  N: 32,
  O: 33,
  P: 34,
  R: 35,
  S: 36,
  T: 37,
  U: 38,
  V: 39,
  W: 40,
  X: 41,
  Y: 42,
  Z: 43,
  a: 44,
  b: 45,
  c: 46,
  d: 47,
  e: 48,
  f: 49,
  g: 50,
  h: 51,
  i: 52,
  j: 53,
  k: 54,
  l: 55,
  m: 56,
  n: 57,
  o: 58,
  p: 59,
  q: 60,
  r: 61,
  s: 62,
  t: 63,
  u: 64,
  v: 65,
  w: 66,
  x: 67,
  y: 68,
  z: 69,
  "—": 70,
  "‘": 71,
  "’": 72,
  "…": 73,
};

const idx2char = {};

vocab.forEach((char, index) => {
  //   char2idx[char] = index;
  idx2char[index] = char;
});

console.log("Vocabulary size:", vocab.length);

async function generateText(model, startString, temperature = 1.0) {
  const numGenerate = 300;

  // Convert startString to character indices
  let inputEval = startString.split("").map((char) => char2idx[char]);
  inputEval = tf.tensor([inputEval]);

  const textGenerated = [];

  // Reset states for layers if applicable
  model.layers.forEach((layer) => {
    if (layer.stateful && layer.resetStates) {
      layer.resetStates();
    }
  });

  for (let i = 0; i < numGenerate; i++) {
    const predictions = model.predict(inputEval);
    const squeezedPredictions = tf.squeeze(predictions, 0);

    // Adjust predictions using the temperature
    const adjustedPredictions = squeezedPredictions.div(temperature);

    // Get the predicted ID
    const predictedIdTensor = tf.multinomial(adjustedPredictions, 1);
    const predictedId = (await predictedIdTensor.data())[0];

    // Prepare the next input
    inputEval = tf.tensor([[predictedId]]);

    // Append the predicted character to the result
    textGenerated.push(idx2char[predictedId]);

    // Clean up tensors to prevent memory leaks
    tf.dispose([
      predictions,
      squeezedPredictions,
      adjustedPredictions,
      predictedIdTensor,
    ]);
  }

  return startString + textGenerated.join("");
}

async function main() {
  await loadModel();

  const startString = "Call me"; // Adjusted start string for testing
  const temperature = 0.8; // Use a moderate temperature for balance

  if (!model) {
    console.error("Model not loaded yet");
    return;
  }

  console.log("Generating text...");
  const generatedText = await generateText(model, startString, temperature);
  console.log("Generated text:");
  console.log(generatedText);
}

main();
