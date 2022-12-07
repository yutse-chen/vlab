from flask import Flask, request, jsonify, redirect, url_for, session
from flask import render_template

# from flask_socketio import SocketIO, emit
# from flask.ext.login import current_user, logout_user

import os
import numpy as np
from numpy import genfromtxt, fromstring
import json
import pprint
import uuid



pp = pprint.PrettyPrinter(width=41, compact=True)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)

app.config['UPLOAD_FOLDER'] = "C:\\Users\\Sean\\PycharmProjects\\vlab\\data"

# private function
def stp_parser():
    fp = './data/' + session.get('username') + ".csv"
    if os.path.isfile(fp):
        raw_data = genfromtxt(fp, delimiter=',', skip_header = 1, dtype=None)
        data = raw_data[11:,]
        cmd_count = (int(np.unique(raw_data[11:,2])[-1])+1)
        find_delay = np.where((data[:,2] == "0"))[0]
        for idx in range(len(find_delay)):
            if find_delay[idx] + 1 != find_delay[idx+1]:
                delay = find_delay[idx]+1
                break
        # switch
        # led 24 - 34
        # seg_0 35 - 43
        # seg_1 44 - 52
        # seg_2 53 - 61
        # seg_3 62 - 70
        cmd_sub_idx = [[24,34], [35, 43], [44, 52], [53, 61], [62, 70]]
        output_key = ["led", "seg_0", "seg_1", "seg_2", "seg_3"]
        output_seg = {"output":[]}
        for cmd in range(cmd_count):
            tmp = {}
            if cmd == 0:
                cmd_idx = cmd + 1
            else:
                cmd_idx = cmd * delay
            for sub_idx, key in zip(cmd_sub_idx, output_key):
                tmp[key] = [ int(l) for l in list((data[cmd_idx,sub_idx[0]:sub_idx[1]].astype(int) +1) % 2) ][::-1]
                if key != "led":
                    tmp[key].insert(-2, tmp[key][-2])
                    tmp[key].insert(-2, tmp[key][-2])
            output_seg["output"].append(tmp)
        os.remove(fp)
        session['rslt'] = output_seg
        return output_seg

@app.route('/get_rslt')
def web_init():
    print(session.get('rslt'))
    return json.dumps(session.get('rslt'), indent = 4)

# @app.route('/')
# def index():
#     return render_template("lab.html")

@app.route('/test', methods=['GET', 'POST'])
def entry():
    # GET request
    if request.method == 'GET':
        # args = request.args
        print("Try to load " + session.get('username') + ".csv")
        msg = stp_parser()
        # pp.pprint(msg)
        return json.dumps(msg, indent = 4)
    # POST request
    if request.method == 'POST':
        print(request.get_json())
        return 'Sucesss', 200

from flask import send_from_directory

# @app.route('/uploads/<filename>')
# def uploaded_file(filename):
#     return send_from_directory(app.config['UPLOAD_FOLDER'],
#                                filename)

@app.route('/', methods=['GET', 'POST'])
def index():
    # session['messages'] = "False"
    rslt = "False"
    if session.get('messages') == "True":
        print("Yee")
        msg = session['messages']
        rslt = session['rslt']
    # print(f"msg={msg}")
    session.clear()
    # print("session: " + session.get('username'))
    return render_template('lab.html', rslt=rslt)

# @app.route('/init')
# def init():
#     resp = {'tmp_fn':str(uuid.uuid4())}
#     return json.dumps(resp, indent = 4)

@app.route('/upload', methods=['POST'])
def upload():
    session['username'] = str(uuid.uuid4())
    session['messages'] = "True"
    file = request.files['upload_file']
    # filename = "stp1.csv"
    fn = session.get('username') + ".csv"
    # aa = fromstring(, dtype=int, sep=',')
    # print(file.read().decode("utf-8"))
    # print(fn)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], 
                            fn))
    print(fn+ " has been saved.")
    stp_parser()
    return redirect(url_for('index'))


# @app.after_request
# def add_header(response):
#     response.cache_control.max_age = 300
#     return response

if __name__ == '__main__':
    app.run(debug=True)
