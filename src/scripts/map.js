( () => {
  ymaps.ready(init);

  const placemarks = [
    {
      latitude: 59.97,
      longitude: 30.31,
      hintContent: '<div class="map__hint"> ул.Литералов, д. 19 </div>',
      balloonContent: [
        '<div class="map__balloon">',
        'Самые вкусные бургеры у нас! Заходите по адресу: ул.Литералов, д. 19',
        '</div>'
      ]
    },
    {
      latitude: 59.94,
      longitude: 30.25,
      hintContent: '<div class="map__hint"> Малый проспект В 0, д. 64 </div>',
      balloonContent: [
        '<div class="map__balloon">',
        'Самые вкусные бургеры у нас! Заходите по адресу: Малый проспект В 0, д. 64',
        '</div>'
      ]
    },
    {
      latitude: 59.93,
      longitude: 30.34,
      hintContent: '<div class="map__hint"> наб. реки Фонтанки, д. 56 </div>',
      balloonContent: [
        '<div class="map__balloon">',
        'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 56',
        '</div>'
      ]
    },
    {
      latitude: 59.91,
      longitude: 30.32,
      hintContent: '<div class="map__hint"> наб. реки Фонтанки, д. 16 </div>',
      balloonContent: [
        '<div class="map__balloon">',
        'Самые вкусные бургеры у нас! Заходите по адресу: наб. реки Фонтанки, д. 16',
        '</div>'
      ]
    }
  ],
  geoObjects = [];

  function init() {
    const map = new ymaps.Map('map', {
      center: [59.94, 30.32],
      zoom: 12,
      controls: ['zoomControl'],
      behaviors: ['drag']
    });

    for (let i = 0; i < placemarks.length; i++) {
        geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent.join('')
      },
      {
        iconLayout: 'default#image',
        iconImageHref: 'images/icons/map-marker.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-23, -57]
      });
    }

    const clusterer = new ymaps.Clusterer({

    });
    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
  }
})();
