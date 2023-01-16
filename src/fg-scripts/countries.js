const DATE_FORMAT_OPTIONS = {
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: '2-digit',
};

const HARDCODED_COUNTRY_IDS = {
  spania: 724,
  belarus: 112,
  bulgaria: 100,
  franta: 250,
  regatulunit: 826,
  slovenia: 705,
  cipru: 196,
  polonia: 616,
  republicamoldova: 498,
  malta: 470,
  danemarca: 208,
  letonia: 428,
  norvegia: 578,
  islanda: 352,
  rusia: 643,
  lituania: 440,
  grecia: 300,
  finlanda: 246,
  portugalia: 620,
  suedia: 752,
  bosniașiherțgovina: '070',
  elveția: 756,
  cehia: 203,
  germania: 276,
  irlanda: 372,
  croația: 191,
  andorra: '020',
  ungaria: 348,
  vatican: 336,
  belgia: '056',
  monaco: 492,
  slovacia: 703,
  serbia: 688,
  estonia: 233,
  muntenegru: 499,
  olanda: 528,
  ucraina: 804,
  turcia: 792,
  liechtenstein: 438,
  sanmarino: 674,
  românia: 642,
  albania: '008',
  austria: '040',
  macedoniadenord: 807,
  luxemburg: 442,
  italia: 380,
};

function getPrompt() {
  const promptElement = document.querySelector('.intrebgenerat.ps-1');

  if (!promptElement) {
    return null;
  }

  return promptElement.textContent.replaceAll(' ', '').toLowerCase();
}

function getCountryId(prompt) {
  if (!prompt) {
    return null;
  }

  return HARDCODED_COUNTRY_IDS[prompt] ?? null;
}

function main() {
  console.log(
    `[${new Date().toLocaleDateString(
      'en-US',
      DATE_FORMAT_OPTIONS
    )} - INFO]: "fg-scripts/countries.js" loaded.`
  );

  // todo wrap the whole procedure in a function and make it repeatable everytime the prompt changes
  const prompt = getPrompt();

  if (!prompt) {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - WARN]: No prompt found. I probably fucked up somewhere`
    );
  } else {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - INFO]: Prompt: "${prompt}".`
    );
  }

  const countryId = getCountryId(prompt);

  if (!countryId) {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - WARN]: No country ID found for prompt "${prompt}". Apparently I've missed one (or more) country(ies).`
    );

    return;
  } else {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - INFO]: Country ID = ${countryId}.`
    );
  }

  const query = `path[id="${countryId}"]`;
  console.log(
    `[${new Date().toLocaleDateString(
      'en-US',
      DATE_FORMAT_OPTIONS
    )} - INFO]: Query = '${query}'`
  );
  const countrySvgElement = document.querySelector(query);

  if (!countrySvgElement) {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - WARN]: No SVG element found for country ID ${countryId}.`
    );

    return;
  } else {
    console.log(
      `[${new Date().toLocaleDateString(
        'en-US',
        DATE_FORMAT_OPTIONS
      )} - INFO]: SVG element found for country ID "${countryId}"`
    );
  }

  let intervalValue = 0;
  let up = true;
  const vanillaStyle = countrySvgElement.getAttribute('style');
  const interval = setInterval(() => {
    const newStyle =
      vanillaStyle + `;fill: #0000000${intervalValue * 2} !important;`;

    countrySvgElement.setAttribute('style', newStyle);

    if (intervalValue === 4 && up) {
      up = false;
    } else if (intervalValue === 0 && !up) {
      up = true;
    }

    if (up) {
      intervalValue++;
    } else {
      intervalValue--;
    }
  }, 100);

  countrySvgElement.addEventListener('mouseover', () => {
    clearInterval(interval);
  });
}

main();
