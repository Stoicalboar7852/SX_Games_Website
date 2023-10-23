chrome.runtime.sendMessage("connect:", () => {});chrome.storage.local.get("browser", (s) => {
		const d = document.documentElement;
		if (!s || !s.hasOwnProperty("browser")) return;
		let b = s["browser"];
		if (b) {
			const scr = "polyfill.min.js";
			if (b == "chrome")
				b = chrome.runtime.getURL("polyfill/chrome/"+scr);
			else if (b == "firefox")
				b = chrome.runtime.getURL("polyfill/firefox/"+scr);
			else if (b == "edge")
				b = chrome.runtime.getURL("polyfill/edge/"+scr);
			d.setAttribute("data-path", b);
			let e = document.createElement("script");
			e.src = chrome.runtime.getURL("polyfill/attach.js");
			e.onload = () => { d.removeChild(e) };
			d.appendChild(e);
		}
});
