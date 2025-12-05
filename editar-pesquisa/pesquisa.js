function openRealDate(realId, visibleId) {
    const realInput = document.getElementById(realId);
    const visibleInput = document.getElementById(visibleId);

    realInput.value = "";
    realInput.showPicker();

    realInput.onchange = () => {
        if (!realInput.value) return;

        const parts = realInput.value.split("-");
        const formatted = parts[2] + "/" + parts[1] + "/" + parts[0];

        visibleInput.value = formatted;
    };
}

document.querySelectorAll('.date-input').forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");

        if (value.length >= 3 && value[2] !== "/")
            value = value.slice(0, 2) + "/" + value.slice(2);

        if (value.length >= 6 && value[5] !== "/")
            value = value.slice(0, 5) + "/" + value.slice(5);

        e.target.value = value.slice(0, 10);
    });
});