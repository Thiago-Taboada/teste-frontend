document.querySelectorAll('.card-avaliacao').forEach(card => {
    const valores = {
        excelente: parseInt(card.dataset.excelente) || 0,
        bom:       parseInt(card.dataset.bom)       || 0,
        regular:   parseInt(card.dataset.regular)   || 0,
        ruim:      parseInt(card.dataset.ruim)      || 0,
        pessimo:   parseInt(card.dataset.pessimo)   || 0
    };

    const total = Object.values(valores).reduce((a, b) => a + b, 0);

    if (total === 0) {
        card.querySelector('.percentual').textContent = "0%";
        card.querySelector('.tag-resultado').textContent = "Sem votos";

        card.querySelectorAll('.linha').forEach(line => {
            line.querySelector('b').textContent = 0;
            const fill = line.querySelector('.fill');
            if (fill) fill.style.width = '0%';
        });
        return;
    }

    let maior = Object.keys(valores).reduce((a, b) => valores[a] > valores[b] ? a : b);

    const percentWinner = Math.round((valores[maior] / total) * 100);

    const percentEl = card.querySelector('.percentual');
    const tag = card.querySelector('.tag-resultado');

    percentEl.textContent = percentWinner + "%";

    const nomes = {
        excelente: "Excelente",
        bom: "Bom",
        regular: "Regular",
        ruim: "Ruim",
        pessimo: "Péssimo"
    };
    tag.textContent = nomes[maior];

    let colorClass = "";
    if (percentWinner < 20) colorClass = "pessimo";
    else if (percentWinner < 40) colorClass = "ruim";
    else if (percentWinner < 60) colorClass = "regular";
    else if (percentWinner < 80) colorClass = "bom";
    else colorClass = "excelente";

    const fillElOfWinner = card.querySelector('.fill.' + maior);
    let color = null;
    if (fillElOfWinner) {
        color = getComputedStyle(fillElOfWinner).backgroundColor;
    } else {
        const fallback = card.querySelector('.fill.' + colorClass);
        if (fallback) color = getComputedStyle(fallback).backgroundColor;
    }

    if (color) {
        percentEl.style.color = color;
        tag.style.backgroundColor = color;
    } else {
        percentEl.style.color = '';
        tag.style.backgroundColor = '';
    }

    const classes = ["excelente", "bom", "regular", "ruim", "pessimo"];
    card.querySelectorAll('.linha').forEach((linea, i) => {
    const classe = classes[i];
    const qtd = valores[classe];

    // Cambiar <b> por <span class="value">
    const valueSpan = linea.querySelector(".value");
    if (valueSpan) valueSpan.textContent = qtd;

    const fill = linea.querySelector(".fill");
    const largura = (qtd / total) * 100;
    if (fill) fill.style.width = largura + "%";
});

});
