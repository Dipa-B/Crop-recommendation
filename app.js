"use strict";

const crops = [
  { name: "rice", emoji: "🌾", values: { N: 80, P: 48, K: 40, temperature: 23, humidity: 82, ph: 6.1, rainfall: 220 }, tip: "Rice generally needs dependable water through the growing season. Check your irrigation and local planting calendar." },
  { name: "maize", emoji: "🌽", values: { N: 80, P: 50, K: 20, temperature: 23, humidity: 65, ph: 6.2, rainfall: 85 }, tip: "Maize often does best with steady early growth and well-drained soil. Ask locally about the right sowing window." },
  { name: "chickpea", emoji: "🫘", values: { N: 40, P: 68, K: 80, temperature: 18, humidity: 16, ph: 6.9, rainfall: 75 }, tip: "Chickpea can suit a drier growing season. Good drainage is important, especially around flowering." },
  { name: "kidney beans", emoji: "🫘", values: { N: 20, P: 68, K: 20, temperature: 20, humidity: 22, ph: 6.0, rainfall: 105 }, tip: "Beans prefer soil that drains well. Avoid waterlogging and check which local variety suits your season." },
  { name: "pigeon peas", emoji: "🫛", values: { N: 20, P: 68, K: 20, temperature: 28, humidity: 48, ph: 6.3, rainfall: 150 }, tip: "Pigeon peas are often grown in warm conditions. Local advice can help with spacing and variety choice." },
  { name: "moth beans", emoji: "🫘", values: { N: 20, P: 48, K: 20, temperature: 28, humidity: 55, ph: 6.8, rainfall: 50 }, tip: "Moth beans are associated with warm, relatively dry conditions. Check local seed availability before planting." },
  { name: "mung bean", emoji: "🫛", values: { N: 20, P: 50, K: 20, temperature: 28, humidity: 85, ph: 6.8, rainfall: 50 }, tip: "Mung bean grows quickly in warm weather. Local season length and water availability will matter." },
  { name: "black gram", emoji: "🫘", values: { N: 40, P: 68, K: 20, temperature: 30, humidity: 65, ph: 7.0, rainfall: 70 }, tip: "Black gram is a warm-season legume. Check your local sowing window and drainage conditions." },
  { name: "lentil", emoji: "🫘", values: { N: 20, P: 68, K: 20, temperature: 24, humidity: 64, ph: 6.9, rainfall: 50 }, tip: "Lentils are often grown in cooler, drier seasons. Local planting dates can make a big difference." },
  { name: "pomegranate", emoji: "🍎", values: { N: 20, P: 12, K: 40, temperature: 22, humidity: 90, ph: 6.4, rainfall: 110 }, tip: "Pomegranate is a longer-term orchard crop. Consider soil drainage and water access over several seasons." },
  { name: "banana", emoji: "🍌", values: { N: 100, P: 82, K: 50, temperature: 27, humidity: 80, ph: 5.9, rainfall: 100 }, tip: "Banana needs a warm, moist growing environment. Reliable water and wind protection are useful to consider." },
  { name: "mango", emoji: "🥭", values: { N: 20, P: 28, K: 30, temperature: 31, humidity: 50, ph: 5.8, rainfall: 95 }, tip: "Mango is a long-term orchard choice. Consider local varieties, drainage and water access before planting." },
  { name: "grapes", emoji: "🍇", values: { N: 25, P: 130, K: 200, temperature: 24, humidity: 82, ph: 6.0, rainfall: 75 }, tip: "Grapes need planning for support, pruning and disease management. Check if your local climate suits them." },
  { name: "watermelon", emoji: "🍉", values: { N: 100, P: 10, K: 50, temperature: 26, humidity: 85, ph: 6.5, rainfall: 50 }, tip: "Watermelon appreciates warm weather and well-drained soil. Check local irrigation needs for fruit development." },
  { name: "muskmelon", emoji: "🍈", values: { N: 100, P: 18, K: 50, temperature: 28, humidity: 93, ph: 6.4, rainfall: 25 }, tip: "Muskmelon is generally associated with warm conditions. Good drainage helps protect developing fruit." },
  { name: "apple", emoji: "🍎", values: { N: 20, P: 135, K: 200, temperature: 22, humidity: 92, ph: 5.9, rainfall: 112 }, tip: "Apple orchards require suitable chill conditions and years of care. Ask a local horticulture expert about varieties." },
  { name: "orange", emoji: "🍊", values: { N: 20, P: 16, K: 10, temperature: 23, humidity: 92, ph: 7.0, rainfall: 110 }, tip: "Citrus is a longer-term planting. Check local variety, drainage and irrigation guidance before starting an orchard." },
  { name: "papaya", emoji: "🧡", values: { N: 50, P: 60, K: 50, temperature: 34, humidity: 90, ph: 6.7, rainfall: 150 }, tip: "Papaya favors warm conditions and is sensitive to waterlogged roots. Local planting advice is worth checking." },
  { name: "coconut", emoji: "🥥", values: { N: 20, P: 20, K: 30, temperature: 27, humidity: 95, ph: 5.9, rainfall: 180 }, tip: "Coconut suits particular warm, humid regions and is a long-term crop. Confirm local suitability before planting." },
  { name: "cotton", emoji: "☁️", values: { N: 120, P: 50, K: 20, temperature: 24, humidity: 80, ph: 6.9, rainfall: 80 }, tip: "Cotton planning depends on your local season, water supply and pest-management guidance." },
  { name: "jute", emoji: "🌿", values: { N: 80, P: 45, K: 40, temperature: 25, humidity: 80, ph: 6.7, rainfall: 175 }, tip: "Jute is generally associated with warm, wet conditions. Check local sowing dates and water availability." },
  { name: "coffee", emoji: "☕", values: { N: 100, P: 25, K: 30, temperature: 26, humidity: 58, ph: 6.8, rainfall: 160 }, tip: "Coffee needs a suitable local climate and long-term care. Ask an extension worker about varieties and shade." },
];

const featureScales = {
  N: 80,
  P: 100,
  K: 100,
  temperature: 12,
  humidity: 45,
  ph: 2.5,
  rainfall: 160,
};

const form = document.querySelector("#field-form");
const errorMessage = document.querySelector("#form-error");
const emptyResult = document.querySelector("#empty-result");
const populatedResult = document.querySelector("#populated-result");
const primaryInputs = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];

function readFieldValues() {
  const values = {};

  for (const name of primaryInputs) {
    const field = form.elements.namedItem(name);
    const value = Number(field.value);
    const min = Number(field.min);
    const max = Number(field.max);

    if (!field.value.trim() || !Number.isFinite(value) || value < min || value > max) {
      field.setAttribute("aria-invalid", "true");
      field.focus();
      return null;
    }

    field.removeAttribute("aria-invalid");
    values[name] = value;
  }

  return values;
}

function rankCropMatches(fieldValues) {
  return crops
    .map((crop) => {
      const squaredDistance = primaryInputs.reduce((total, feature) => {
        const difference = (fieldValues[feature] - crop.values[feature]) / featureScales[feature];
        return total + difference * difference;
      }, 0);
      const distance = Math.sqrt(squaredDistance / primaryInputs.length);
      const score = Math.round(100 / (1 + distance));
      return { ...crop, score };
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, 3);
}

function renderMatches(matches) {
  const [bestMatch, ...otherMatches] = matches;
  document.querySelector("#crop-emoji").textContent = bestMatch.emoji;
  document.querySelector("#result-title-filled").textContent = bestMatch.name;
  document.querySelector("#match-score").textContent = `${bestMatch.score}% similar`;
  document.querySelector("#score-bar").style.width = `${bestMatch.score}%`;
  document.querySelector("#result-tip-text").textContent = bestMatch.tip;

  const alternatives = document.querySelector("#alternatives");
  alternatives.replaceChildren(...otherMatches.map((crop) => {
    const row = document.createElement("div");
    row.className = "alternative";

    const emoji = document.createElement("span");
    emoji.className = "alternative-emoji";
    emoji.textContent = crop.emoji;

    const name = document.createElement("span");
    name.className = "alternative-name";
    name.textContent = crop.name;

    const score = document.createElement("span");
    score.className = "alternative-score";
    score.textContent = `${crop.score}% match`;

    row.append(emoji, name, score);
    return row;
  }));

  emptyResult.hidden = true;
  populatedResult.hidden = false;
  document.querySelector("#result-title-filled").focus({ preventScroll: true });
}

function showEmptyResult() {
  populatedResult.hidden = true;
  emptyResult.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readFieldValues();

  if (!values) {
    errorMessage.hidden = false;
    showEmptyResult();
    return;
  }

  errorMessage.hidden = true;
  renderMatches(rankCropMatches(values));
});

form.addEventListener("input", () => {
  errorMessage.hidden = true;
  if (!populatedResult.hidden) showEmptyResult();
});

document.querySelector("#sample-button").addEventListener("click", () => {
  const sampleValues = { N: 80, P: 48, K: 40, temperature: 23, humidity: 82, ph: 6.1, rainfall: 220 };

  for (const [name, value] of Object.entries(sampleValues)) {
    form.elements.namedItem(name).value = value;
    form.elements.namedItem(name).removeAttribute("aria-invalid");
  }

  errorMessage.hidden = true;
  showEmptyResult();
});

document.querySelector("#edit-button").addEventListener("click", () => {
  showEmptyResult();
  document.querySelector('[name="temperature"]').focus();
});
