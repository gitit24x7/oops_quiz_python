from Questions import python_questions

question_number = 0
Score = 0

def check_answer(response, answer):
    if (response == answer):
        print ("Congrats! This is the correct answer!")
        score+=1
    else:
        print("Sorry! This is the wrong answer!")
        print("The correct answer is", answer)

for questions in python_questions:
    question_number +=1
    print(question_number,".", questions["question"]) 
    print("Options are" ,questions["options"])
    response = input("Enter the correct answer, Please enter all the options in the captial case: ")
    check_answer(response, questions["answer"])
    
## we can add a functionality so that the user can enter q or any other word to exit in between as well

