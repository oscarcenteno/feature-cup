Given a JSON thet contains the features of a system such as:

{
    "system": {
      "name": "My System",
      "modules": [
        {
          "name": "Module A",
          "features": [
            {
              "name": "Feature 1",
              "description": "This is feature 1 of module A"
            },
            {
              "name": "Feature 2",
              "description": "This is feature 2 of module A"
            },
            {
              "name": "Feature 3",
              "description": "This is feature 3 of module A"
            }
          ]
        },
        {
          "name": "Module B",
          "features": [
            {
              "name": "Feature 4",
              "description": "This is feature 4 of module B"
            },
            {
              "name": "Feature 5",
              "description": "This is feature 5 of module B"
            },
            {
              "name": "Feature 6",
              "description": "This is feature 6 of module B"
            }
          ]
        }
      ]
    }
  }
  

  and a list of test suit names with a format such as "{module name} / {feature name} / any other data".

  The goal is to generate a feature coverage report such as this one:

+------------+----------------------+---------+
| Module     | Feature              | Covered |
+------------+----------------------+---------+
| Module A   | feature 1            | Yes     |
|            | feature 2            | No      |
|            | feature 3            | Yes     |
+------------+----------------------+---------+
| Module B   | feature 4            | Yes     |
|            | feature 5            | Yes     |
|            | feature 6            | No      |
+------------+----------------------+---------+

Create the code in JS ES6, and use any library you want to help you with the task.