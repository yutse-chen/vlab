from flask import Flask, request, jsonify
from flask import render_template
import json

app = Flask(__name__)

def web_init():
    pass

@app.route('/')
def index():
    return render_template("lab.html")

@app.route('/test', methods=['GET', 'POST'])
def entry():
    # GET request
    if request.method == 'GET':
        args = request.args
        with open('./data/demo.json') as jf:
            msg = json.load(jf)
        print(msg)
        return jsonify(msg) 
    # POST request
    if request.method == 'POST':
        print(request.get_json())
        return 'Sucesss', 200

# @app.after_request
# def add_header(response):
#     response.cache_control.max_age = 300
#     return response

if __name__ == '__main__':
    app.run(debug=True)
