define({
  "type": "object",
  "name": "",
  "title": "",
  "desc": "/introduce/detail?name=ruby<br />  关于该接口的描述...",
  "rule": "",
  "example": "{\n  \"name\": {\n    \"first\": \"ruby\",\n    \"last\": \"huang\"\n  },\n  \"hobby\": [\n    \"roller skating\"\n  ],\n  \"address\": {\n    \"area\": \"华东\",\n    \"region\": \"浙江\"\n  },\n  \"email\": \"skysunshine99@126.com\",\n  \"icon\": \"http://www.ruby.com/ruby.png_200x300.webp\",\n  \"food\": \"cookie\",\n  \"date\": \"2014-01-01\",\n  \"space\": \"http://www.ruby.i\",\n  \"sentence\": \"Enjoy what you have\",\n  \"age\": 27,\n  \"powers\": {\n    \"community\": {\n      \"read\": true,\n      \"write\": true\n    },\n    \"manage\": {\n      \"read\": true,\n      \"write\": false\n    }\n  }\n}",
  "$$": {
    "name": {
      "type": "object",
      "name": "name",
      "title": "名字",
      "desc": "",
      "rule": "",
      "example": "{\n  \"first\": \"ruby\",\n  \"last\": \"huang\"\n}",
      "$$": {
        "first": {
          "type": "string",
          "name": "first",
          "title": "",
          "desc": "",
          "rule": "",
          "example": "\"ruby\""
        },
        "last": {
          "type": "string",
          "name": "last",
          "title": "",
          "desc": "",
          "rule": "",
          "example": "\"huang\""
        }
      }
    },
    "hobby": {
      "type": "array",
      "name": "hobby",
      "title": "兴趣爱好",
      "desc": "",
      "rule": "",
      "example": "[\n  \"roller skating\"\n]",
      "$$": [
        {
          "type": "string",
          "name": "0",
          "title": "",
          "desc": "",
          "rule": "",
          "example": "\"roller skating\""
        }
      ]
    },
    "address": {
      "type": "object",
      "name": "address",
      "title": "所在地",
      "desc": "现居地址",
      "rule": "",
      "example": "{\n  \"area\": \"华东\",\n  \"region\": \"浙江\"\n}",
      "$$": {
        "area": {
          "type": "string",
          "name": "area",
          "title": "",
          "desc": "",
          "rule": "",
          "example": "\"华东\""
        },
        "region": {
          "type": "string",
          "name": "region",
          "title": "",
          "desc": "",
          "rule": "",
          "example": "\"浙江\""
        }
      }
    },
    "email": {
      "type": "string",
      "name": "email",
      "title": "邮箱",
      "desc": "注册邮箱",
      "rule": "",
      "example": "\"skysunshine99@126.com\""
    },
    "icon": {
      "type": "string",
      "name": "icon",
      "title": "头像",
      "desc": "社区网站头像",
      "rule": "",
      "example": "\"http://www.ruby.com/ruby.png_200x300.webp\""
    },
    "food": {
      "type": "string",
      "name": "food",
      "title": "喜欢的食物",
      "desc": "",
      "rule": "",
      "example": "\"cookie\""
    },
    "date": {
      "type": "string",
      "name": "date",
      "title": "注册日期",
      "desc": "",
      "rule": "yyyy-MM-dd",
      "example": "\"2014-01-01\""
    },
    "space": {
      "type": "string",
      "name": "space",
      "title": "个人主页",
      "desc": "个人中心地址",
      "rule": "",
      "example": "\"http://www.ruby.i\""
    },
    "sentence": {
      "type": "string",
      "name": "sentence",
      "title": "喜欢的一句话",
      "desc": "",
      "rule": "",
      "example": "\"Enjoy what you have\""
    },
    "age": {
      "type": "number",
      "name": "age",
      "title": "年龄",
      "desc": "",
      "rule": "",
      "example": "27"
    },
    "powers": {
      "type": "object",
      "name": "powers",
      "title": "网站权限",
      "desc": "在该网站的权限",
      "rule": "",
      "example": "{\n  \"community\": {\n    \"read\": true,\n    \"write\": true\n  },\n  \"manage\": {\n    \"read\": true,\n    \"write\": false\n  }\n}",
      "$$": {
        "community": {
          "type": "object",
          "name": "community",
          "title": "社区权限",
          "desc": "",
          "rule": "",
          "example": "{\n  \"read\": true,\n  \"write\": true\n}",
          "$$": {
            "read": {
              "type": "boolean",
              "name": "read",
              "title": "浏览权限",
              "desc": "是否可浏览社区文章",
              "rule": "",
              "example": "true"
            },
            "write": {
              "type": "boolean",
              "name": "write",
              "title": "发布权限",
              "desc": "是否可以发布文章",
              "rule": "",
              "example": "true"
            }
          }
        },
        "manage": {
          "type": "object",
          "name": "manage",
          "title": "管理权限",
          "desc": "",
          "rule": "",
          "example": "{\n  \"read\": true,\n  \"write\": false\n}",
          "$$": {
            "read": {
              "type": "boolean",
              "name": "read",
              "title": "查看用户权限",
              "desc": "是否可查看用户信息",
              "rule": "",
              "example": "true"
            },
            "write": {
              "type": "boolean",
              "name": "write",
              "title": "操作用户权限",
              "desc": "是否可以对用户进行增删改操作",
              "rule": "",
              "example": "false"
            }
          }
        }
      }
    }
  }
});