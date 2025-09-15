var map = L.map('map').setView([4.695135420669119, -74.08618227939654], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Cargar y mostrar el GeoJSON de Bogotá
fetch('bogota.geojson')
    .then(function (response) { return response.json(); })
    .then(function (data) {
        var geojsonLayer = L.geoJSON(data, {
            style: function (feature) {
                if (feature.geometry && feature.geometry.type === 'Polygon') {
                    return { color: '#1d4ed8', weight: 2, fillColor: '#60a5fa', fillOpacity: 0.25 };
                }
                return undefined;
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, { radius: 6, color: '#b91c1c', fillColor: '#ef4444', fillOpacity: 0.8 });
            }
        }).addTo(map);

        var bounds = geojsonLayer.getBounds();
        if (bounds && bounds.isValid()) {
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    })
    .catch(function (err) {
        console.error('No se pudo cargar bogota.geojson:', err);
    });