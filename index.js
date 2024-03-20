const mainContent = document.querySelector("#main-grid");
const radiosTimespan = document.getElementsByName("timespan");
const response = fetch('/data.json', { method: "GET" });

timeframesTypesClass = {
    'Work': 'panel--work',
    'Play': 'panel--play',
    'Study': 'panel--study',
    'Exercise': 'panel--exercise',
    'Social': 'panel--social',
    'Self Care': 'panel--self-care'
}

previousTimeframeName = {
    'daily': 'Yesterday',
    'weekly': 'Last week',
    'monthly': 'Last Month'
}

function timeframesHtml(timeframes) {
    const template = (timeframeType, timeframe) =>
        `<span class="panel__worked-hours" data-timeframe="${timeframeType}">${timeframe.current}hrs</span>
    <span class="panel__previous-worked-hours" data-timeframe="${timeframeType}">${previousTimeframeName[timeframeType]} - ${timeframe.previous}hrs</span>`;
    console.log(timeframes);
    let strTimeframes = '';
    for (const timeframe in timeframes) {
        strTimeframes += template(timeframe, timeframes[timeframe]);
    }

    console.log(strTimeframes);
    return strTimeframes;
}

const panelHtml = (title, timeframes) => `
<div class="panel__content">
  <div class="panel__title-container">
    <h2 class="panel__title">${title}</h2>
    <svg width="21" height="5">
      <use xlink:href='images/icon-ellipsis.svg#img' href="images/icon-ellipsis.svg#img"></use>
    </svg>
  </div>

  <div class="panel__worked-hours-container">
    ${timeframesHtml(timeframes)}
  </div>
</div>
`;


function getTimeSpanSelected() {
    for (const radio of radiosTimespan) {
        if (radio.checked) {
            return radio.value;
        }
    }
    return null;
}

function setBodyData() {
    document.body.dataset.timeframeselected = getTimeSpanSelected();
}

function createGridItens(data) {
    data.forEach((item) => {

        const panelComponent = document.createElement('section');
        panelComponent.classList.add('panel');
        panelComponent.classList.add(timeframesTypesClass[item.title]);
        panelComponent.innerHTML = panelHtml(item.title, item.timeframes);
        mainContent.append(panelComponent);

    });
}

setBodyData();

radiosTimespan.forEach(radio => {
    radio.addEventListener('change', (e) => setBodyData())
});


response
    .then((result) => {
        result.json().then((data) => {
            createGridItens(data);
        });
    });