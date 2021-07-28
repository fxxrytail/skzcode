

function watermark() {
	document.getElementById("write-content").style.backgroundImage = "url(http://localhost:1313/images/banner-oh.jpg)";
}


// for showing Menu

function openMenu() {
	menuStat = document.getElementById("navMenu").style.display;

	if (menuStat != "block"){
		document.getElementById("navMenu").classList.add("is-active");
		document.getElementById("navMenuBg").classList.add("is-active");
	}

	else {
    document.getElementById("navMenu").classList.remove("is-active");
		document.getElementById("navMenuBg").classList.remove("is-active");
	}
}

function closeMenu() {
  document.getElementById("navMenu").classList.remove("is-active");
  document.getElementById("navMenuBg").classList.remove("is-active");
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
