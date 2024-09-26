$('#loadDataBtn').click(function() {
    let selectedServer = $('#server-select').val();
    let url = '';

    if (selectedServer === 'weather') {
        url = 'http://localhost:3000/api/weather?city=Berlin'; // API für Wetter
    } else if (selectedServer === 'news') {
        url = 'http://localhost:3000/api/news'; // API für Nachrichten
    }

    $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
            if (selectedServer === 'weather') {
                $('#data-output').html(`
                    <h2>Wetter in ${data.name}</h2>
                    <p>Temperatur: ${data.main.temp}°C</p>
                    <p>Wetter: ${data.weather[0].description}</p>
                `);
            } else if (selectedServer === 'news') {
                let newsHtml = '<h2>Aktuelle Nachrichten</h2>';
                $.each(data.articles, function(index, article) {
                    newsHtml += `
                        <div class="article">
                            <h3>${article.title}</h3>
                            <p>${article.description}</p>
                            <a href="${article.url}" target="_blank">Mehr lesen</a>
                        </div>
                    `;
                });
                $('#data-output').html(newsHtml);
            }
        },
        error: function() {
            $('#data-output').html('<p>Fehler beim Laden der Daten.</p>');
        }
    });
});
