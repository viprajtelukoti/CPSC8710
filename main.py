from flask import Flask, request, render_template, session, redirect, url_for, jsonify
import random
import json

app = Flask(__name__)

app.secret_key = 'super_secret_key'  # Change this to a random, secure value

# Load questions from the JSON file
with open('questions.json', 'r') as file:
    questions = json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/play', methods=['GET', 'POST'])
def play():
    if request.method == 'GET':
        random.shuffle(questions)
        session['score'] = 0
        session['current_question'] = 0

    if request.method == 'POST':
        user_answer = request.form.get('answer')
        current_question = questions[session['current_question']]

        if user_answer != None:
            if user_answer == current_question['answer']:
                session['score'] += 1

            session['current_question'] += 1

            if session['current_question'] == 5:
                return render_template('gameover.html', score=session['score'])

    current_question = questions[session['current_question']]

    return render_template('play.html', question=current_question)

if __name__ == "__main__":
    app.run(port=1500, debug=True)

