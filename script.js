// Exchange Rates
const kasToSwodnRate = 10; // 1 KAS = 25 SWODN (BUY 100 SNOWDN FOR 4 KAS)
const swodnToKasRate = 0.02; // 1 SNOWDN = 0.02 KAS (SELL 100 SNOWDN FOR 2 KAS)

// DOM Elements
const kasInput = document.getElementById('kas-amount');
const swodnInput = document.getElementById('swodn-amount');
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');
const toggleBtn = document.getElementById('toggle-btn');
const sendLabel = document.getElementById('send-label');
const getLabel = document.getElementById('get-label');

// Initial State
let isKasToSwodn = true; // Default mode: You send KAS, get SNOWDN
const maxSnowdn = 1000; // Maximum SNOWDN per transaction

// Event: When Input Changes
kasInput.addEventListener('input', () => {
  const kasAmount = parseFloat(kasInput.value);

  if (!isNaN(kasAmount)) {
    let calculatedAmount = isKasToSwodn
      ? kasAmount * kasToSwodnRate
      : kasAmount * swodnToKasRate;

    // Limit the maximum SNOWDN to 1000
    if (isKasToSwodn && calculatedAmount > maxSnowdn) {
      calculatedAmount = maxSnowdn;
      kasInput.value = (maxSnowdn / kasToSwodnRate).toFixed(2);
    }

    swodnInput.value = calculatedAmount.toFixed(2);
  } else {
    swodnInput.value = '';
  }
});

swodnInput.addEventListener('input', () => {
  const swodnAmount = parseFloat(swodnInput.value);

  if (!isNaN(swodnAmount)) {
    let calculatedAmount = isKasToSwodn
      ? swodnAmount / kasToSwodnRate
      : swodnAmount / swodnToKasRate;

    // Limit the maximum SNOWDN to 1000
    if (swodnAmount > maxSnowdn) {
      swodnInput.value = maxSnowdn;
      calculatedAmount = isKasToSwodn
        ? maxSnowdn / kasToSwodnRate
        : maxSnowdn / swodnToKasRate;
    }

    kasInput.value = calculatedAmount.toFixed(2);
  } else {
    kasInput.value = '';
  }
});

// Event: Toggle Exchange Direction
toggleBtn.addEventListener('click', () => {
  isKasToSwodn = !isKasToSwodn;
  if (isKasToSwodn) {
    sendLabel.textContent = 'You Send (KAS):';
    getLabel.textContent = 'You Get (SNOWDN):';
  } else {
    sendLabel.textContent = 'You Send (SNOWDN):';
    getLabel.textContent = 'You Get (KAS):';
  }

  // Reset input values on toggle
  kasInput.value = '';
  swodnInput.value = '';
});

buyBtn.addEventListener('click', () => {
  alert('Redirecting to Treasury wallet page...');
  window.location.href = './buytreasury.html';
});

sellBtn.addEventListener('click', () => {
  alert('Redirecting to Treasury wallet page...');
  window.location.href = './selltreasury.html';
});

