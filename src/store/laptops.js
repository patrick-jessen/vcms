export default {
  "inspector": {
    "selected": "app/$pages/default"
  },
  "app": {
    "$type": "App",
    "$children": {
      "menu": {
        "$type": "Menu",
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
      "footer": {
        "$type": "Footer"
      }
    },
    "$pages": {
      "laptops": {
        "$type": "Laptops",
        "$children": {
          "hero": {
            "$type": "Hero",
            "items": [
              {
                "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/gaze12/hero_wide_1280-e5a14a6c72.jpg",
                "link": "#0"
              },
              {
                "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/oryp3/hero_wide_1280-02cc3e6cba.jpg",
                "link": "#1"
              },
              {
                "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/kudu4/hero_wide_1280-d3924b7405.jpg",
                "link": "#2"
              },
              {
                "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/galp2/hero_wide_1280-f762ff343f.jpg",
                "link": "#3"
              },
              {
                "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/lemu7/hero_wide_1280-cbc61456c5.jpg",
                "link": "#4"
              }
            ],
            "duration": "5000",
            "transition": "fade"
          },
          "content": {
            "$type": "ProductList"
          }
        }
      },
      "default": {
        "$type": "Frontpage",
        "video": {
          "videofile": "https://d1vhcvzji58n1j.cloudfront.net/assets/home/hero-749e29ffaf.mp4",
          "poster": "https://d1vhcvzji58n1j.cloudfront.net/assets/home/hero-coffee-09be8e6aae.jpg"
        },
        "$children": {},
        "heading": "We are System76.",
        "subheading": "We make powerful computers to help you do more, go further, and unleash your potential."
      },
      "desktops": {
        "$type": "Desktops",
        "$children": {}
      }
    }
  }
}