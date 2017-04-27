export default {
  "inspector": {
    "selected": "app/$pages/default/$children/content/$children/banners/1"
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
        "$children": {
          "content": {
            "$type": "Banners",
            "$children": {
              "banners": [
                {
                  "$type": "FullWidthBanner",
                  "button": {
                    "link": "/",
                    "text": "VIEW NOW"
                  },
                  "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/galp2/hero_1280-7dd0f44210.jpg",
                  "overlay": [
                    {
                      "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/products/galp2/hero-home-text_1280-eed98825eb.png",
                      "width": "50"
                    }
                  ]
                },
                {
                  "$type": "FullWidthBanner",
                  "button": {
                    "link": "/",
                    "text": "VIEW NOW"
                  },
                  "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/kaby-lake/hero-bg_1280-cca66a08e9.jpg",
                  "overlay": [
                    {
                      "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/kaby-lake/wavy-text-a5e54583b6.png",
                      "width": "50"
                    },
                    {
                      "image": "http://d1vhcvzji58n1j.cloudfront.net/assets/products/oryp3/feature_1280-d664fb9e20.png",
                      "width": "30"
                    },
                    {
                      "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/kaby-lake/now-shipping-oryx-e25729595a.png",
                      "width": "25"
                    }
                  ]
                }
              ]
            }
          }
        },
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