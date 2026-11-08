// Simple photo gallery lightbox for the Beyond the Code section
(function () {
    const box = document.getElementById("lightbox");
    if (!box) return;
    const img = box.querySelector("img");
    const cap = box.querySelector("figcaption");
    let items = [];
    let index = 0;
    let opener = null;

    function show(i) {
        index = (i + items.length) % items.length;
        const item = items[index];
        img.src = item.getAttribute("href");
        img.alt = item.dataset.caption;
        cap.textContent = item.dataset.caption + "  (" + (index + 1) + " of " + items.length + ")";
    }

    function open(name, btn) {
        items = Array.from(document.querySelectorAll("#gallery-" + name + " a"));
        if (!items.length) return;
        opener = btn;
        box.hidden = false;
        document.body.style.overflow = "hidden";
        show(0);
        box.querySelector(".lb-close").focus();
    }

    function close() {
        box.hidden = true;
        document.body.style.overflow = "";
        if (opener) opener.focus();
    }

    document.querySelectorAll(".gallery-open").forEach(function (btn) {
        btn.addEventListener("click", function () { open(btn.dataset.gallery, btn); });
    });
    box.querySelector(".lb-close").addEventListener("click", close);
    box.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });
    document.addEventListener("keydown", function (e) {
        if (box.hidden) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
    });
})();
