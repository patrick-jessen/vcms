export default {
  "inspector": {
    "selected": "app/menu"
  },
  "app": {
    "$type": "App",
    "$children": {
      "menu": {
        "$type": "Menu",
        "logo": {
          "link": "/",
          "image": "https://d1vhcvzji58n1j.cloudfront.net/assets/logo-1c27efee7b.png"
        },
        "menus": [
          {
            "text": "laptops",
            "link": "laptops"
          },
          {
            "text": "desktops",
            "link": "desktops"
          },
          {
            "text": "servers",
            "link": "servers"
          },
          {
            "text": "swag",
            "link": "swag"
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
      }
    }
  }
}