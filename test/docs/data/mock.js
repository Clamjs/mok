define({
  "type": "object",
  "name": "",
  "title": "api : a.json",
  "desc": "adfladsjklajd",
  "rule": "",
  "example": "{\n  \"code\": 0,\n  \"msg\": \"success\",\n  \"data\": {\n    \"model\": {\n      \"id\": 123123,\n      \"name\": 333,\n      \"age\": \"sdadf\",\n      \"child\": [\n        {\n          \"name\": \"adfasdf\"\n        }\n      ]\n    }\n  }\n}",
  "$$": {
    "code": {
      "type": "number",
      "name": "code",
      "title": "zhengchauaga",
      "desc": "",
      "rule": "",
      "example": "0"
    },
    "msg": {
      "type": "string",
      "name": "msg",
      "title": "tishi",
      "desc": "",
      "rule": "",
      "example": "\"success\""
    },
    "data": {
      "type": "object",
      "name": "data",
      "title": "fan",
      "desc": "",
      "rule": "",
      "example": "{\n  \"model\": {\n    \"id\": 123123,\n    \"name\": 333,\n    \"age\": \"sdadf\",\n    \"child\": [\n      {\n        \"name\": \"adfasdf\"\n      }\n    ]\n  }\n}",
      "$$": {
        "model": {
          "type": "object",
          "name": "model",
          "title": "real data",
          "desc": "",
          "rule": "",
          "example": "{\n  \"id\": 123123,\n  \"name\": 333,\n  \"age\": \"sdadf\",\n  \"child\": [\n    {\n      \"name\": \"adfasdf\"\n    }\n  ]\n}",
          "$$": {
            "id": {
              "type": "number",
              "name": "id",
              "title": "user id",
              "desc": "",
              "rule": "",
              "example": "123123"
            },
            "name": {
              "type": "number",
              "name": "name",
              "title": "username",
              "desc": "",
              "rule": "",
              "example": "333"
            },
            "age": {
              "type": "string",
              "name": "age",
              "title": "user age",
              "desc": "",
              "rule": "",
              "example": "\"sdadf\""
            },
            "child": {
              "type": "array",
              "name": "child",
              "title": "user children",
              "desc": "",
              "rule": "",
              "example": "[\n  {\n    \"name\": \"adfasdf\"\n  }\n]",
              "$$": [
                {
                  "type": "object",
                  "name": "0",
                  "title": "",
                  "desc": "",
                  "rule": "",
                  "example": "{\n  \"name\": \"adfasdf\"\n}",
                  "$$": {
                    "name": {
                      "type": "string",
                      "name": "name",
                      "title": "child1",
                      "desc": "",
                      "rule": "",
                      "example": "\"adfasdf\""
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  }
});