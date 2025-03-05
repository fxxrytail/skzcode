/** Watch Short Forms */

// open pop-up for shorts
function watchShorts(platform, sourceLink, modLink) {
  let embedLink = modLink;
  const popEm = document.getElementById('popup-embed');
  const emCon = document.getElementById('embed-container');
  popEm.classList.remove('hidden');
  emCon.classList.remove('hidden');
  popEm.classList.add('show');
  emCon.classList.add('show');

  const anchor = document.getElementById('anchorLink');
  anchor.href = sourceLink;

  if (platform == 'youtube') {
    const ytcon = document.getElementById('yt-embed-container'); 
    ytcon.innerHTML = '';

    // Create the iframe element for YouTube embed
    const ytIframe = document.createElement('iframe');
    ytIframe.width = '330';
    ytIframe.height = '586';
    ytIframe.src = embedLink+1;
    ytIframe.frameborder = '0';
    ytIframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    ytIframe.allowFullscreen = true;

    // Append the iframe to the container
    ytcon.appendChild(ytIframe);

  } else if (platform == 'tiktok') {
    const ttcon = document.getElementById('tt-embed-container'); 
    ttcon.innerHTML = '';

    // Create the iframe element for Tiktok embed
    const ttIframe = document.createElement('iframe');
    ttIframe.width = '325';
    ttIframe.height = '580';
    ttIframe.src = embedLink;
    ttIframe.frameborder = '0';
    ttIframe.allow = 'autoplay; encrypted-media';
    ttIframe.allowFullscreen = true;

    // Append the iframe to the container
    ttcon.appendChild(ttIframe);

  } else if (platform == 'twitter') {
    const container = document.getElementById('x-embed-container');
    container.style.width = '90vw';
    container.style.maxWidth = '500px';
    container.innerHTML = '';

    // Create the blockquote element for Twitter embed
    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('twitter-tweet');
    blockquote.setAttribute('data-media-max-width', '550')
    blockquote.setAttribute('data-conversation', 'none'); 

    // Create the anchor tag for the tweet URL
    const anchor = document.createElement('a');
    anchor.setAttribute('href', embedLink);

    // Append the anchor to the blockquote
    blockquote.appendChild(anchor);

    // Append the blockquote to the container
    container.appendChild(blockquote);

    // Create the Twitter embed script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = function() {
        // This will process and render the embed
        twttr.widgets.load();
    };

    // Append the script inside the container
    container.appendChild(script);
    
  } else if (platform == 'instagram') {
    const emCon = document.getElementById('embed-container');
    const igcon = document.getElementById('ig-embed-container');
    emCon.style.maxWidth = '330px';
    //igcon.style.margin = '0 -15px';
    igcon.innerHTML = '';

    // Create the blockquote element for Instagram embed
    const blockquote = document.createElement('blockquote');
    blockquote.classList.add('instagram-media');
    blockquote.setAttribute('data-instgrm-permalink', embedLink);
    blockquote.setAttribute('data-instgrm-version', '14');

    // Create the anchor tag for the URL (required for Instagram embeds)
    const anchor = document.createElement('a');
    anchor.setAttribute('href', embedLink);
    anchor.setAttribute('target', '_blank');

    // Append the anchor to the blockquote
    blockquote.appendChild(anchor);

    // Append the blockquote to the container
    igcon.appendChild(blockquote);

    // Create the Instagram embed script
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = function() {
        window.instgrm.Embeds.process();  // Process the Instagram embed after the script loads
    };

    // Append the script inside the container
    igcon.appendChild(script);

    // write notes
    document.getElementById('emNotes').innerHTML = "Click on the video to play and pause. Some IG reels can't be played here due to the IG account's restriction.";
  }

}

function closeShorts() {
  const popEm = document.getElementById('popup-embed');
  const emCon = document.getElementById('embed-container');
  popEm.classList.remove('show');
  emCon.classList.remove('show');
  popEm.classList.add('hidden');
  emCon.classList.add('hidden');

  document.getElementById('emNotes').innerHTML = '';
  embedLink = '';

  // remove youtube iframe
  const ytiframe = document.getElementById('yt-embed-container').querySelector('iframe');
  const ytscript = document.getElementById('yt-embed-container').querySelector('script');

  if (ytiframe) {
      ytiframe.remove();
      ytscript.remove();
  }

  // remove tiktok iframe
  const ttiframe = document.getElementById('tt-embed-container').querySelector('iframe');

  if (ttiframe) {
      ttiframe.remove();
  }

  // remove twitter iframe
  const xiframe = document.getElementById('x-embed-container').querySelector('iframe');
  const xscript = document.getElementById('x-embed-container').querySelector('script');

  if (xiframe) {
      xiframe.remove();
      xscript.remove();
  }

  document.getElementById('x-embed-container').removeAttribute('style');
  
  // remove instagram iframe
  const iframe = document.getElementById('ig-embed-container').querySelector('iframe');
  const igscript = document.getElementById('x-embed-container').querySelector('script');

  if (iframe) {
      iframe.remove();
      igscript.remove();
  }

  document.getElementById('embed-container').removeAttribute('style');
  //document.getElementById('ig-embed-container').removeAttribute('style');

  
}

/** Popup Ad **/
// Check if popup should be shown
window.onload = function () {
  const dontShowToday = localStorage.getItem('dontShowToday');
  const now = new Date().getTime();
  if (!dontShowToday || now > dontShowToday) {
      setTimeout(showPopup, 5000);  // Show popup after 5 seconds
     // setTimeout(showPopup, 0);  // Show popup instantly
  }
}

// Show popup function
function showPopup() {
  document.getElementById('popup').style.display = 'block';
  startTimer();
}

// Countdown timer
function startTimer() {
  let timer = 10;
  const countdown = setInterval(function () {
      timer--;
      document.getElementById('timer').textContent = timer;
      if (timer === 0) {
          clearInterval(countdown);
          document.getElementById('closepop').classList.remove("hidden");
          document.getElementById('dontShowAgain').classList.remove("hidden");
          document.getElementById('p_timer').classList.add("hidden");
          //closePopup();
      }
  }, 1000);
}

// Close the popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Don't show this again today
function dontShowAgain() {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);  // Set to midnight

  // Store in local storage with timestamp of next day
  localStorage.setItem('dontShowToday', tomorrow.getTime());
  closePopup();
}

//
function dateOrder(){
  navBtnv = document.getElementsByClassName("dateOrder").style.innerHTML;

  if (navBtnv != "DESC"){
  document.getElementsByClassName("dateOrder").style.innerHTML = "DESC";
  }

  else {
    document.getElementsByClassName("dateOrder").style.innerHTML = "ASC";
  }
}


// tab

function openTab(evt, tabName, tc, tb) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName(tc);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName(tb);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


/* watermark?
function watermark() {
	document.getElementById("write-content").style.backgroundImage = "url(http://localhost:1313/images/banner-oh.jpg)";
} */


// for showing Menu
function openMore() {
  document.getElementById("shin-menu").classList.add("hidden");
  document.getElementById("more-menu").classList.remove("hidden");
  document.getElementById("navMenuBg").classList.remove("hidden");
}

function openMenu() {
	menuStat = document.getElementById("navMenu").style.display;

	if (menuStat != "block"){
		document.getElementById("navMenu").classList.add("is-active");
		document.getElementById("navMenuBg").classList.remove("hidden");
    document.getElementById("shin-menu").classList.add("hidden");
	}

	else {
    document.getElementById("navMenu").classList.remove("is-active");
		document.getElementById("navMenuBg").classList.add("hidden");
    document.getElementById("shin-menu").classList.remove("hidden");
	}
}

function closeMenu() {
  document.getElementById("navMenu").classList.remove("is-active");
  document.getElementById("navMenuBg").classList.add("hidden");
  document.getElementById("shin-menu").classList.remove("hidden");
  document.getElementById("more-menu").classList.add("hidden");
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("btnTop").style.display = "block";
    } else {
        document.getElementById("btnTop").style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}













// for copying url
function copyText() {
  /* Get the text field */
  var copyText = document.getElementById("site-url");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText.value);
}
