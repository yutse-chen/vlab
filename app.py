from flask import Flask, request, jsonify, redirect, url_for
from flask import render_template
import os
import numpy as np
from numpy import genfromtxt
import json
import pprint
pp = pprint.PrettyPrinter(width=41, compact=True)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = "C:\\Users\\Sean\\PycharmProjects\\vlab\\data"
# private function
def stp_parser():
    raw_data = genfromtxt('./data/stp1.csv', delimiter=',', skip_header = 1, dtype=None)
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
    return output_seg


def web_init():
    pass

# @app.route('/')
# def index():
#     return render_template("lab.html")

@app.route('/test', methods=['GET', 'POST'])
def entry():
    # GET request
    if request.method == 'GET':
        args = request.args
        # with open('./data/demo2.json') as jf:
        #     msg = json.load(jf)
        msg = stp_parser()
        pp.pprint(msg)
        return json.dumps(msg, indent = 4)
        # return msg
        # return jsonify(msg) 
    # POST request
    if request.method == 'POST':
        print(request.get_json())
        return 'Sucesss', 200

from flask import send_from_directory

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)

@app.route('/', methods=['GET', 'POST'])
def index():
    # if request.method == 'POST':
    #     file = request.files['upload_file']
    #     filename = "123.csv"
    #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], 
    #                             filename))
        # return redirect(url_for('uploaded_file',
                                # filename=filename))
    # return '''
    # <!doctype html>
    # <title>Upload new File</title>
    # <h1>Upload new File</h1>
    # <form action="" method=post enctype=multipart/form-data>
    #   <p><input type=file name=file>
    #      <input type=submit value=Upload>
    # </form>
    # '''
    return render_template('lab.html')


# @app.route("/", methods=["POST","GET"])
# def index():
#     if request.method == "POST":
#         # upload_file = request.form.get("myfile")
#         upload_file = request.files['myfile']
#         # upload_file.save(os.path.join("data", "upload_demo.csv"))
#         # print(upload_file)
    # return render_template('lab.html')


@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['upload_file']
    filename = "123.csv"
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], 
                            filename))
    return redirect(url_for('index'))


# @app.after_request
# def add_header(response):
#     response.cache_control.max_age = 300
#     return response

if __name__ == '__main__':
    app.run(debug=True)
