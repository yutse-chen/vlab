
# coding: utf-8




import numpy as np
import json
from numpy import genfromtxt
raw_data = genfromtxt('stp1.csv', delimiter=',', skip_header = 1, dtype=None)
# 34 - 42
# 43 - 51
# 52 - 60
# 61 - 70
print(raw_data[12,])
data = raw_data[11:,]


# In[131]:


cmd_count = (int(np.unique(raw_data[11:,2])[-1])+1)
cmd_count


# In[137]:



find_delay = np.where((data[:,2] == "0"))[0]

for idx in range(len(find_delay)):
    if find_delay[idx] + 1 != find_delay[idx+1]:
        delay = find_delay[idx]+1
        break
print(delay)

# print(delay)
# find_repeat = data[:,1]
# for idx in range(find_repeat):
#     if (find_repeat[idx])
#     print(idx)
# print(find_repeat)


# In[187]:


# switch
# led 24 - 34
# seg_0 35 - 43
# seg_1 44 - 52
# seg_2 53 - 61
# seg_3 62 - 70
print(delay)

cmd_sub_idx = [[24,34], [35, 43], [44, 52], [53, 61], [62, 70]]
output_key = ["led", "seg_0", "seg_1", "seg_2", "seg_3"]
output_seg = {"output":[]}
def cmd_parse1():
    for cmd in range(cmd_count):
        tmp = {}
        if cmd == 0:
            cmd_idx = cmd + 1
        else:
            cmd_idx = cmd * delay
        for sub_idx, key in zip(cmd_sub_idx, output_key):
            tmp[key] = list((data[cmd_idx,sub_idx[0]:sub_idx[1]].astype(int) +1) % 2)
#             tmp[key] = list()[::-1]

#             print(tmp[key], end="")
#             if key != "led" and tmp[key][-2]:
#                 print("<-")
#             else:
#                 print()
            if key != "led":
#                 print(key, end=" ")
#                 print(tmp[key])
                tmp[key].insert(-2, tmp[key][-2])
                tmp[key].insert(-2, tmp[key][-2])
#                 print(key, end=" ")
#                 print(tmp[key])
        output_seg["output"].append(tmp)
cmd_parse1()
print(output_seg)
json.dumps(output_seg, "")
# print(output_seg['output'][0]['led'][::-1])
# print(output_seg['output'][0]['led'])


# In[114]:


def cmd_parse2():
    for cmd in range(cmd_count):
    #     data[]
        if cmd == 0:
            cmd_idx = cmd + 1
        else:
            cmd_idx = cmd * delay
        led = data[cmd_idx,sub_idx[0]:sub_idx[1]]
        seg_0 = data[cmd_idx,35:43]
        seg_1 = data[cmd_idx,44:52]
        seg_2 = data[cmd_idx,53:61]
        seg_3 = data[cmd_idx,62:70]
        print(seg_3)

