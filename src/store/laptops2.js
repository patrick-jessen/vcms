export default {
  "app": {
    "$type": "App",
    "$children": {
      "menu": {
        "$type": "Menu",
        "$props": {
          "logo": {
            "link": "/",
            "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/logo-1c27efee7b.png",
            "invertedimage": "https://d1vhcvzji58n1j.cloudfront.net/assets/logo-white-mono-ccaad31ec9.png"
            },
          "menus": [
            {
              "text": "laptops",
              "link": "/laptops"
            },
            {
              "text": "desktops",
              "link": "/desktops"
            },
            {
              "text": "servers",
              "link": "/servers"
            },
            {
              "text": "swag",
              "link": "/swag"
            }
            ],
          "actions": [
            {
              "icon": "comments",
              "link": "contact"
            },
            {
              "icon": "life ring",
              "link": "support"
            },
            {
              "icon": "user",
              "link": "my-account"
            }
            ]
          },
        },
      "page": {
        "$type": "Page",
        "$pages": {
          "/": {
            "$type": "Frontpage",
            "$props": {
              "video": {
                "videofile": "https://d1vhcvzji58n1j.cloudfront.net/assets/home/hero-749e29ffaf.mp4",
                "poster": "https://d1vhcvzji58n1j.cloudfront.net/assets/home/hero-coffee-09be8e6aae.jpg"
                },
              "heading": "We are System76.",
              "subheading": "We make powerful computers to help you do more, go further, and unleash your potential."
              },
            "$children": {

              }
            }
          }
        },
      "footer": {
        "$type": "Footer"
        }
      },
    }
  }