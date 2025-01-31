// Exchange Rates
const kasToSwodnRate = 10; // 1 KAS = 10 SNOWDN (BUY)
const swodnToKasRate = 0.02; // 1 SNOWDN = 0.02 KAS (SELL)
const ksdogToSwodnBuyRate = 100000; // 100,000 KSDOG = 1 SNOWDN (BUY)
const ksdogToSwodnSellRate = 200000; // 200,000 KSDOG = 1 SNOWDN (SELL)

// DOM Elements
const sendInput = document.getElementById('send-amount');
const swodnInput = document.getElementById('swodn-amount');
const buyBtn = document.getElementById('buy-btn');
const sellBtn = document.getElementById('sell-btn');
const toggleBtn = document.getElementById('toggle-btn');
const sendLabel = document.getElementById('send-label');
const getLabel = document.getElementById('get-label');
const currencySelect = document.getElementById('currency-select');

// Initial State
let isKasToSwodn = true; // Default mode: You send KAS, get SNOWDN
let selectedCurrency = 'KAS'; // Default currency
const maxSnowdn = 1000; // Maximum SNOWDN per transaction

// Event: When Input Changes
sendInput.addEventListener('input', () => {
  const sendAmount = parseFloat(sendInput.value);

  if (!isNaN(sendAmount)) {
    let calculatedAmount;
    if (selectedCurrency === 'KAS') {
      calculatedAmount = isKasToSwodn
        ? sendAmount * kasToSwodnRate
        : sendAmount * swodnToKasRate;
    } else if (selectedCurrency === 'KSDOG') {
      calculatedAmount = isKasToSwodn
        ? sendAmount / ksdogToSwodnBuyRate
        : sendAmount / ksdogToSwodnSellRate;
    }

    // Limit the maximum SNOWDN to 1000
    if (calculatedAmount > maxSnowdn) {
      calculatedAmount = maxSnowdn;
      if (selectedCurrency === 'KAS') {
        sendInput.value = (maxSnowdn / kasToSwodnRate).toFixed(2);
      } else if (selectedCurrency === 'KSDOG') {
        sendInput.value = (maxSnowdn * ksdogToSwodnBuyRate).toFixed(2);
      }
    }

    swodnInput.value = calculatedAmount.toFixed(2);
  } else {
    swodnInput.value = '';
  }
});

swodnInput.addEventListener('input', () => {
  const swodnAmount = parseFloat(swodnInput.value);

  if (!isNaN(swodnAmount)) {
    let calculatedAmount;
    if (selectedCurrency === 'KAS') {
      calculatedAmount = isKasToSwodn
        ? swodnAmount / kasToSwodnRate
        : swodnAmount / swodnToKasRate;
    } else if (selectedCurrency === 'KSDOG') {
      calculatedAmount = isKasToSwodn
        ? swodnAmount * ksdogToSwodnBuyRate
        : swodnAmount * ksdogToSwodnSellRate;
    }

    // Limit the maximum SNOWDN to 1000
    if (swodnAmount > maxSnowdn) {
      swodnInput.value = maxSnowdn;
      if (selectedCurrency === 'KAS') {
        calculatedAmount = isKasToSwodn
          ? maxSnowdn / kasToSwodnRate
          : maxSnowdn / swodnToKasRate;
      } else if (selectedCurrency === 'KSDOG') {
        calculatedAmount = isKasToSwodn
          ? maxSnowdn * ksdogToSwodnBuyRate
          : maxSnowdn * ksdogToSwodnSellRate;
      }
    }

    sendInput.value = calculatedAmount.toFixed(2);
  } else {
    sendInput.value = '';
  }
});

// Event: Toggle Exchange Direction
toggleBtn.addEventListener('click', () => {
  isKasToSwodn = !isKasToSwodn;
  updateLabels();
  resetInputs();
});

// Event: Change Currency
currencySelect.addEventListener('change', () => {
  selectedCurrency = currencySelect.value;
  updateLabels();
  resetInputs();
});

// Update Labels Based on Selected Currency and Mode
function updateLabels() {
  if (selectedCurrency === 'KAS') {
    sendLabel.textContent = isKasToSwodn ? 'You Send (KAS):' : 'You Send (SNOWDN):';
    getLabel.textContent = isKasToSwodn ? 'You Get (SNOWDN):' : 'You Get (KAS):';
  } else if (selectedCurrency === 'KSDOG') {
    sendLabel.textContent = isKasToSwodn ? 'You Send (KSDOG):' : 'You Send (SNOWDN):';
    getLabel.textContent = isKasToSwodn ? 'You Get (SNOWDN):' : 'You Get (KSDOG):';
  }
}

// Reset Input Values
function resetInputs() {
  sendInput.value = '';
  swodnInput.value = '';
}

// Buy and Sell Buttons
buyBtn.addEventListener('click', () => {
  alert('Redirecting to Treasury wallet page...');
  window.location.href = './buytreasury.html';
});

sellBtn.addEventListener('click', () => {
  alert('Redirecting to Treasury wallet page...');
  window.location.href = './selltreasury.html';
});