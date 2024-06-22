from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def screen1():
    return render_template('index.html')

@app.route('/upsclientinfo')
def screen2():
    return render_template('sheet1.html')

@app.route('/techmahindrainfo')
def screen3():
    return render_template('sheet2.html')

@app.route('/techmahindraemployeedetails')
def screen4():
    return render_template('sheet3.html')

@app.route('/issues')
def screen5():
    return render_template('sheet4.html')

if __name__ == '__main__':
    app.run(debug=True, port = 8000)