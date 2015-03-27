/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Student = require('../api/student/student.model.js');

User.find({}).remove(function() {
  User.create(
    {
      "name": "Maryann Emerson",
      "email": "maryannemerson@puria.com",
      "role": {
        "type": "user"
      },
      "password": "deserunt",
      "provider": "local",
      "contextPacks": [{
        "contextName": "nouns",
        "contents":[
          {"wordName": "house",
            "wordType": "noun",
            "wordColor": "green"},
          {"wordName": "jump",
            "wordType": "noun",
            "wordColor": "green"},
          {"wordName": "walk",
            "wordType": "noun",
            "wordColor": "green"}
        ]
      }],
      "tileBucket": [
        {"wordName": "house",
          "wordType": "noun",
          "wordColor": "green"},
        {"wordName": "jump",
          "wordType": "noun",
          "wordColor": "green"},
        {"wordName": "walk",
          "wordType": "noun",
          "wordColor": "green"}
      ],

      "studentGroups": [
        {
          "groupName": "in",
          "students": [
            {
              "name": "Trina"
            }
          ]
        }
      ]
    },
    {
      "name": "Lavonne Cochran",
      "email": "lavonnecochran@puria.com",
      "role": {
        "type": "user"
      },
      "password": "nisi",
      "provider": "local",
      contextPacks: [{
        contextName: "Verbs/Actions",
        contents:[
          {wordName: "run",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "jump",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "walk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "talk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "swim",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "talk",
            wordType: "verb",
            wordColor: "green"},
          {wordName: "climb",
            wordType: "verb",
            wordColor: "green"}
        ]},
        {
          contextName: "Animals",
          contents:[
            {wordName: "Cat",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Dog",
              wordType: "noun",
              wordColor: "blue"},
            {wordName: "Zebra",
              wordType: "noun",
              wordColor: "blue"},
            {wordName: "Llama",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Horse",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Bird",
              wordType: "noun",
              wordColor: "green"},
            {wordName: "Lizard",
              wordType: "noun",
              wordColor: "green"}
          ]

        }
      ],
      "tileBucket": [
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
      ],

      "studentGroups": [
        {
          "groupName": "aliquip",
          "students": [
            {
              "name": "Banks"
            },
            {
              "name": "Wiley"
            },
            {
              "name": "Juliana"
            },
            {
              "name": "Allen"
            },
            {
              "name": "Mayo"
            },
            {
              "name": "Keller"
            }
          ]
        },
        {
          "groupName": "anim",
          "students": [
            {
              "name": "Cochran"
            },
            {
              "name": "Vasquez"
            },
            {
              "name": "Rose"
            },
            {
              "name": "Lynne"
            },
            {
              "name": "Castillo"
            },
            {
              "name": "Lora"
            }
          ]
        },
        {
          "groupName": "do",
          "students": [
            {
              "name": "Angelica"
            },
            {
              "name": "Slater"
            },
            {
              "name": "Mays"
            },
            {
              "name": "Jean"
            },
            {
              "name": "Mcknight"
            },
            {
              "name": "Mckee"
            }
          ]
        },
        {
          "groupName": "officia",
          "students": [
            {
              "name": "Stafford"
            },
            {
              "name": "Bishop"
            },
            {
              "name": "Liliana"
            },
            {
              "name": "Lloyd"
            },
            {
              "name": "Beasley"
            },
            {
              "name": "Peggy"
            }
          ]
        },
        {
          "groupName": "exercitation",
          "students": [
            {
              "name": "Erickson"
            },
            {
              "name": "Tracie"
            },
            {
              "name": "Leila"
            },
            {
              "name": "Lacy"
            },
            {
              "name": "Jolene"
            },
            {
              "name": "Chen"
            },
            {
              "name": "Hammond"
            }
          ]
        },
        {
          "groupName": "ut",
          "students": [
            {
              "name": "Saunders"
            },
            {
              "name": "Geraldine"
            },
            {
              "name": "Bender"
            },
            {
              "name": "Cantrell"
            },
            {
              "name": "Miles"
            },
            {
              "name": "Gilliam"
            },
            {
              "name": "Mcfadden"
            }
          ]
        }
      ]
    },
    {
      "name": "Evelyn Mayer",
      "email": "evelynmayer@puria.com",
      "role": {
        "type": "user"
      },
      "password": "incididunt",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "cillum",
          "students": [
            {
              "name": "Harrington"
            }
          ]
        }
      ]
    },
    {
      "name": "Bond Guerrero",
      "email": "bondguerrero@puria.com",
      "role": {
        "type": "user"
      },
      "password": "aliquip",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "nostrud",
          "students": [
            {
              "name": "Vasquez"
            }
          ]
        }
      ]
    },
    {
      "name": "Ratliff Pitts",
      "email": "ratliffpitts@puria.com",
      "role": {
        "type": "user"
      },
      "password": "pariatur",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "occaecat",
          "students": [
            {"contextPacks": [
        {
          "wordName": "labore",
          "wordType": "noun",
          "wordColor": "blue"
        }
      ],
              "name": "Good"
            }
          ]
        }
      ]
    },
    {
      "name": "Cathy Burris",
      "email": "cathyburris@puria.com",
      "role": {
        "type": "user"
      },
      "password": "irure",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "id",
          "students": [
            {
              "name": "Kennedy"
            }
          ]
        }
      ]
    },
    {
      "name": "Mejia Mullen",
      "email": "mejiamullen@puria.com",
      "role": {
        "type": "user"
      },
      "password": "ad",
      "provider": "local",
      "contextPacks": [{
        "contextName": "Verbs",
        "contents":[
          {"wordName": "run",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "jump",
            "wordType": "verb",
            "wordColor": "blue"},
          {"wordName": "walk",
            "wordType": "verb",
            "wordColor": "blue"}
        ]
      }],
      "tileBucket": [
        {"wordName": "run",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "jump",
          "wordType": "verb",
          "wordColor": "blue"},
        {"wordName": "walk",
          "wordType": "verb",
          "wordColor": "blue"}
      ],
      "studentGroups": [
        {
          "groupName": "Lorem",
          "students": [
            {
              "name": "Mayer"
            }
          ]
        }
      ]
    }
  );
});

console.log("Test");
Student.find({}).remove(function() {
  Student.create(
    {
      "firstName": "Liza",
      "lastName": "Pratt",
      "id": "0001",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Battle",
      "lastName": "Whitaker",
      "id": "0002",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Leanna",
      "lastName": "Garrison",
      "id": "0003",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Sherman",
      "lastName": "Foster",
      "id": "0004",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Cassie",
      "lastName": "Ramos",
      "id": "0005",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Calderon",
      "lastName": "Daniel",
      "id": "0006",
      "studentContextPackArray": [],
      "studentWordArray": []
    },
    {
      "firstName": "Shanna",
      "lastName": "Boyle",
      "id": "0007",
      "studentContextPackArray": [],
      "studentWordArray": []
    }

  );
});

/*

 [
 '{{repeat(5, 7)}}',
 {
 name: '{{firstName()}} {{surname()}}',
 email: '{{email()}}',
 role: {
 type: 'user'
 },
 password: '{{lorem(1, "words")}}',
 provider: 'local',
 contextPacks: [{
 wordName: '{{lorem(1, "words")}}',
 wordType: 'noun',
 wordColor: 'blue'
 }],
 studentGroups: [
 {
 groupName: '{{lorem(1, "words")}}',
 students: [{
 name: '{{firstName()}}'
 }]
 }
 ]

 }
 ]*/



