#creating a list of dictionaries for the quiz
python_questions = [
    {
        "question": "What is the correct way to create a class in Python?",
        "options": ["A. class MyClass:", "B. create MyClass:", "C. def MyClass:", "D. new MyClass:"],
        "answer": "A"
    },
    {
        "question": "What method is automatically called when an object is created?",
        "options": ["A. __start__", "B. __create__", "C. __init__", "D. __new__"],
        "answer": "C"
    },
    {
        "question": "What does 'self' refer to in a class method?",
        "options": ["A. The class itself", "B. The current instance of the class", "C. The parent class", "D. A global variable"],
        "answer": "B"
    },
    {
        "question": "Which OOP concept allows a child class to use methods of a parent class?",
        "options": ["A. Polymorphism", "B. Encapsulation", "C. Abstraction", "D. Inheritance"],
        "answer": "D"
    },
    {
        "question": "What is the output of: print(type(42))?",
        "options": ["A. <class 'number'>", "B. <class 'int'>", "C. <class 'integer'>", "D. <class 'float'>"],
        "answer": "B"
    },
    {
        "question": "How do you make a variable private in Python?",
        "options": ["A. private var", "B. var!", "C. _var or __var", "D. #var"],
        "answer": "C"
    },
    {
        "question": "What is encapsulation?",
        "options": ["A. Hiding internal details and exposing only necessary parts", "B. Creating multiple classes", "C. Using loops inside classes", "D. Importing modules"],
        "answer": "A"
    },
    {
        "question": "Which keyword is used to inherit from a parent class?",
        "options": ["A. extends", "B. inherits", "C. The parent class name in parentheses", "D. super"],
        "answer": "C"
    },
    {
        "question": "What does the super() function do?",
        "options": ["A. Creates a new class", "B. Deletes the parent class", "C. Calls a method from the parent class", "D. Makes a method static"],
        "answer": "C"
    },
    {
        "question": "What is polymorphism in Python?",
        "options": ["A. Using many modules", "B. Same method name behaving differently in different classes", "C. Creating many objects", "D. Using many loops"],
        "answer": "B"
    },
    {
        "question": "Which method is called when you use print() on an object?",
        "options": ["A. __print__", "B. __display__", "C. __str__", "D. __show__"],
        "answer": "C"
    },
    {
        "question": "What is the difference between a class and an object?",
        "options": ["A. No difference", "B. A class is a blueprint, an object is an instance", "C. An object is a blueprint, a class is an instance", "D. Classes can't have methods"],
        "answer": "B"
    },
    {
        "question": "What are class attributes?",
        "options": ["A. Variables defined inside __init__", "B. Variables shared by all instances of a class", "C. Variables defined outside the class", "D. Variables that can't be changed"],
        "answer": "B"
    },
    {
        "question": "What is method overriding?",
        "options": ["A. Deleting a method", "B. Defining a method in child class with same name as parent", "C. Creating two methods with different names", "D. Calling a method twice"],
        "answer": "B"
    },
    {
        "question": "What does isinstance(obj, ClassName) do?",
        "options": ["A. Creates a new instance", "B. Checks if obj is an instance of ClassName", "C. Converts obj to ClassName", "D. Deletes the instance"],
        "answer": "B"
    },
    {
        "question": "What is a constructor in Python?",
        "options": ["A. A function that destroys objects", "B. The __init__ method that initializes objects", "C. A loop inside a class", "D. An imported module"],
        "answer": "B"
    },
    {
        "question": "Can a class inherit from multiple parent classes in Python?",
        "options": ["A. No, only single inheritance is allowed", "B. Yes, Python supports multiple inheritance", "C. Only with a special module", "D. Only up to 2 parent classes"],
        "answer": "B"
    },
    {
        "question": "What is the correct way to create an object of class Dog?",
        "options": ["A. Dog.create()", "B. new Dog()", "C. Dog()", "D. create.Dog()"],
        "answer": "C"
    },
    {
        "question": "What does __len__ allow you to do?",
        "options": ["A. Print the object", "B. Use len() on your object", "C. Compare two objects", "D. Loop through the object"],
        "answer": "B"
    },
    {
        "question": "What is abstraction in OOP?",
        "options": ["A. Making all methods public", "B. Showing only essential features and hiding complexity", "C. Using only integers", "D. Removing all comments from code"],
        "answer": "B"
    }
]
