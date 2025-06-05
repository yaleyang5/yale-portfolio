/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

;(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $footer = $("#footer"),
    $main = $("#main"),
    $main_articles = $main.children("article")

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  })

  // Set random background image color.

  // Helper function to generate a random color in rgba format
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const a = 0.95 // keeping alpha constant as 0.95
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  // Helper function to choose a random background image
  const getRandomBackgroundImage = () => {
    const images = ["parasol_kirby.gif", "cook_kirby.gif", "warp_star.gif"]
    return images[Math.floor(Math.random() * images.length)]
  }

  // Function to update all random content on the page
  const updateRandomContent = () => {
    // Initialize refresh counter
    if (localStorage.getItem("refreshCount")) {
      localStorage.setItem(
        "refreshCount",
        parseInt(localStorage.getItem("refreshCount")) + 1
      )
    } else {
      localStorage.setItem("refreshCount", 1)
    }

    // Update the background-image of the #bg:before pseudo-element
    const color1 = getRandomColor()
    const color2 = getRandomColor()
    const backgroundImage = getRandomBackgroundImage()
    const newBackgroundImage = `linear-gradient(in oklab, ${color1}, ${color2}), url("images/${backgroundImage}")`
    const styleElement = document.createElement("style")
    styleElement.textContent = `#bg:before { background-image: ${newBackgroundImage} !important; }`
    document.head.appendChild(styleElement)

    // Update text content
    document.getElementById("greeting").textContent =
      Math.random() < 1 / 3
        ? "Hi, I'm "
        : Math.random() < 0.5
        ? "Hello, I'm "
        : "Hey, I'm "

    document.getElementById("name").textContent =
      Math.random() < 1 / 3
        ? "Yale."
        : Math.random() < 0.5
        ? "Yale!"
        : "Yale :-)"

    document.getElementById("tagline").textContent =
      Math.random() < 1 / 3
        ? "Your Favorite Frontend Developer"
        : Math.random() < 0.5
        ? "The Developer You've Been Looking For"
        : "The Frontend Developer You Need"

    const refreshCount = localStorage.getItem("refreshCount")
    document.getElementById("refresh-message").textContent =
      refreshCount < 5
        ? Math.random() < 1 / 3
          ? "(try refreshing to spot the difference)"
          : Math.random() < 0.5
          ? "(try refreshing!)"
          : "(refresh to see the magic!)"
        : Math.random() < 1 / 4
        ? `You've refreshed this page ${refreshCount} times!`
        : Math.random() < 1 / 3
        ? `You've refreshed this page ${refreshCount} times.`
        : Math.random() < 0.5
        ? `You've refreshed ${refreshCount} times!`
        : `You've refreshed ${refreshCount} times.`

    // Update nav text
    document.getElementById("about-text").textContent =
      Math.random() < 0.5 ? "ABOUT ME" : "AB0U7 M3"
    document.getElementById("work-text").textContent =
      Math.random() < 0.5 ? "WORK" : "W0RK"
    document.getElementById("projects-text").textContent =
      Math.random() < 0.5 ? "PROJECTS" : "PR0J3C75"
    document.getElementById("contact-text").textContent =
      Math.random() < 0.5 ? "CONTACT" : "C0N7AC7"
  }

  // Call the function to update content on page load
  document.addEventListener("DOMContentLoaded", updateRandomContent)

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload")
    }, 100)
  })

  // Fix: Flexbox min-height bug on IE.
  if (browser.name == "ie") {
    var flexboxFixTimeoutId

    $window
      .on("resize.flexbox-fix", function () {
        clearTimeout(flexboxFixTimeoutId)

        flexboxFixTimeoutId = setTimeout(function () {
          if ($wrapper.prop("scrollHeight") > $window.height())
            $wrapper.css("height", "auto")
          else $wrapper.css("height", "100vh")
        }, 250)
      })
      .triggerHandler("resize.flexbox-fix")
  }

  // Nav.
  var $nav = $header.children("nav"),
    $nav_li = $nav.find("li")

  // Add "middle" alignment classes if we're dealing with an even number of items.
  if ($nav_li.length % 2 == 0) {
    $nav.addClass("use-middle")
    $nav_li.eq($nav_li.length / 2).addClass("is-middle")
  }

  // Main.
  var delay = 325,
    locked = false

  // Youtube Video.

  const workSection = document.getElementById("work")
  const youtubeVideo = document.getElementById("youtube-video")

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        // Stop the video by setting the src to an empty string
        youtubeVideo.src = ""
      } else {
        // Restore the video src if needed (optional)
        youtubeVideo.src =
          "https://www.youtube.com/embed/?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=kyb4ehU9WNw&loop=0&endscreen=0"
      }
    })
  })

  // Observe the work section
  observer.observe(workSection)

  // Methods.
  $main._show = function (id, initial) {
    var $article = $main_articles.filter("#" + id)

    // No such article? Bail.
    if ($article.length == 0) return

    // Handle lock.

    // Already locked? Speed through "show" steps w/o delays.
    if (locked || (typeof initial != "undefined" && initial === true)) {
      // Mark as switching.
      $body.addClass("is-switching")

      // Mark as visible.
      $body.addClass("is-article-visible")

      // Deactivate all articles (just in case one's already active).
      $main_articles.removeClass("active")

      // Hide header, footer.
      $header.hide()
      $footer.hide()

      // Show main, article.
      $main.show()
      $article.show()

      // Activate article.
      $article.addClass("active")

      // Unlock.
      locked = false

      // Unmark as switching.
      setTimeout(
        function () {
          $body.removeClass("is-switching")
        },
        initial ? 1000 : 0
      )

      return
    }

    // Lock.
    locked = true

    // Article already visible? Just swap articles.
    if ($body.hasClass("is-article-visible")) {
      // Deactivate current article.
      var $currentArticle = $main_articles.filter(".active")

      $currentArticle.removeClass("active")

      // Show article.
      setTimeout(function () {
        // Hide current article.
        $currentArticle.hide()

        // Show article.
        $article.show()

        // Activate article.
        setTimeout(function () {
          $article.addClass("active")

          // Window stuff.
          $window.scrollTop(0).triggerHandler("resize.flexbox-fix")

          // Unlock.
          setTimeout(function () {
            locked = false
          }, delay)
        }, 25)
      }, delay)
    }

    // Otherwise, handle as normal.
    else {
      // Mark as visible.
      $body.addClass("is-article-visible")

      // Show article.
      setTimeout(function () {
        // Hide header, footer.
        $header.hide()
        $footer.hide()

        // Show main, article.
        $main.show()
        $article.show()

        // Activate article.
        setTimeout(function () {
          $article.addClass("active")

          // Window stuff.
          $window.scrollTop(0).triggerHandler("resize.flexbox-fix")

          // Unlock.
          setTimeout(function () {
            locked = false
          }, delay)
        }, 25)
      }, delay)
    }
  }

  $main._hide = function (addState) {
    var $article = $main_articles.filter(".active")

    // Article not visible? Bail.
    if (!$body.hasClass("is-article-visible")) return

    // Add state?
    if (typeof addState != "undefined" && addState === true)
      history.pushState(null, null, "#")

    // Handle lock.

    // Already locked? Speed through "hide" steps w/o delays.
    if (locked) {
      // Mark as switching.
      $body.addClass("is-switching")

      // Deactivate article.
      $article.removeClass("active")

      // Hide article, main.
      $article.hide()
      $main.hide()

      // Show footer, header.
      $footer.show()
      $header.show()

      // Unmark as visible.
      $body.removeClass("is-article-visible")

      // Unlock.
      locked = false

      // Unmark as switching.
      $body.removeClass("is-switching")

      // Window stuff.
      $window.scrollTop(0).triggerHandler("resize.flexbox-fix")

      return
    }

    // Lock.
    locked = true

    // Deactivate article.
    $article.removeClass("active")

    // Hide article.
    setTimeout(function () {
      // Hide article, main.
      $article.hide()
      $main.hide()

      // Show footer, header.
      $footer.show()
      $header.show()

      // Unmark as visible.
      setTimeout(function () {
        $body.removeClass("is-article-visible")

        // Window stuff.
        $window.scrollTop(0).triggerHandler("resize.flexbox-fix")

        // Unlock.
        setTimeout(function () {
          locked = false
        }, delay)
      }, 25)
    }, delay)
  }

  // Articles.
  $main_articles.each(function () {
    var $this = $(this)

    // Close.
    $('<div class="close">Close</div>')
      .appendTo($this)
      .on("click", function () {
        location.hash = ""
      })

    // Prevent clicks from inside article from bubbling.
    $this.on("click", function (event) {
      event.stopPropagation()
    })
  })

  // Events.
  $body.on("click", function (event) {
    // Article visible? Hide.
    if ($body.hasClass("is-article-visible")) $main._hide(true)
  })

  $window.on("keyup", function (event) {
    switch (event.keyCode) {
      case 27:
        // Article visible? Hide.
        if ($body.hasClass("is-article-visible")) $main._hide(true)

        break

      default:
        break
    }
  })

  $window.on("hashchange", function (event) {
    // Empty hash?
    if (location.hash == "" || location.hash == "#") {
      // Prevent default.
      event.preventDefault()
      event.stopPropagation()

      // Hide.
      $main._hide()
    }

    // Otherwise, check for a matching article.
    else if ($main_articles.filter(location.hash).length > 0) {
      // Prevent default.
      event.preventDefault()
      event.stopPropagation()

      // Show article.
      $main._show(location.hash.substr(1))
    }
  })

  // Scroll restoration.
  // This prevents the page from scrolling back to the top on a hashchange.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual"
  else {
    var oldScrollPos = 0,
      scrollPos = 0,
      $htmlbody = $("html,body")

    $window
      .on("scroll", function () {
        oldScrollPos = scrollPos
        scrollPos = $htmlbody.scrollTop()
      })
      .on("hashchange", function () {
        $window.scrollTop(oldScrollPos)
      })
  }

  // Initialize.

  // Hide main, articles.
  $main.hide()
  $main_articles.hide()

  // Initial article.
  if (location.hash != "" && location.hash != "#")
    $window.on("load", function () {
      $main._show(location.hash.substr(1), true)
    })

  // Form Submission.
  const googleSheet =
    "https://script.google.com/macros/s/AKfycbwIfJk3RFFg27nnk-XvlaZmB-6DCa48fiA2qFQ-O_6Ej2FIZMe90RmI4URhuHcndpey7A/exec"
  const emailSubmit = "https://api.web3forms.com/submit"

  const form = document.forms["contact-form"]

  form.addEventListener("submit", (e) => {
    document.getElementById("submit-contact-form").style.backgroundColor =
      "#CCCCCC"
    e.preventDefault()
    fetch(googleSheet, { method: "POST", body: new FormData(form) })
      .then((response) =>
        fetch(emailSubmit, { method: "POST", body: new FormData(form) })
      )
      .then((response) => alert("Thank you! Message sent successfully."))
      .then(() => {
        window.location.replace("#")
        document.getElementById("submit-contact-form").style.backgroundColor =
          ""
        document.getElementById("contact-form").reset()
      })
      .catch((error) => console.error("Error!", error.message))
  })
})(jQuery)
