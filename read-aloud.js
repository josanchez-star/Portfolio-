// "Listen to this page" button: reads the main page content aloud
// using the browser's built-in speech (Web Speech API).
(function () {
    if (!("speechSynthesis" in window)) return;
    const main = document.getElementById("main");
    if (!main) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "read-aloud";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = '<span aria-hidden="true">&#128266;</span> Listen to this page';
    document.body.appendChild(btn);

    let reading = false;

    function setState(on) {
        reading = on;
        btn.setAttribute("aria-pressed", String(on));
        btn.innerHTML = on
            ? '<span aria-hidden="true">&#9632;</span> Stop reading'
            : '<span aria-hidden="true">&#128266;</span> Listen to this page';
    }

    function pageText() {
        const copy = main.cloneNode(true);
        copy.querySelectorAll("[hidden], .gallery-items, script").forEach(function (el) { el.remove(); });
        return copy.innerText.replace(/\s+\n/g, "\n").trim();
    }

    btn.addEventListener("click", function () {
        if (reading) {
            speechSynthesis.cancel();
            setState(false);
            return;
        }
        speechSynthesis.cancel();
        // Split into sentences so long pages read reliably in every browser
        const chunks = pageText().match(/[^.!?\n]+[.!?]*\s*/g) || [];
        chunks.forEach(function (part, i) {
            const u = new SpeechSynthesisUtterance(part.trim());
            u.lang = "en-US";
            u.rate = 1;
            if (i === chunks.length - 1) u.onend = function () { setState(false); };
            speechSynthesis.speak(u);
        });
        setState(true);
    });

    window.addEventListener("beforeunload", function () { speechSynthesis.cancel(); });
})();
