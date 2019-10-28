# -*- coding: utf-8 -*-
"""
Created on Wed Oct 23 22:17:05 2019

@author: thsia
"""

import pandas as pd
import MySQLdb
import pandas.io.sql as psql
import sqlalchemy as sql
from sshtunnel import SSHTunnelForwarder
from collections import defaultdict
from collections import Counter
import sshtunnel
import pickle

import json
from pandas.io.json import json_normalize

import plotly.express as px
import json
import pickle
import pandas as pd


seq_map = dict()
sequnces_data_frame = pd.read_pickle('C:\\artathon\\clone_509919_sequences.pkl')
sequnces_data_frame['tree_layer'] = None
sequnces_data_frame['tree_order'] = None

f = pd.read_pickle('C:\\artathon\\clone_509919_tree.pkl')
#json_obj = json.loads(f.tree)
json_obj = 0
for jsn in f.tree:
    json_obj = json.loads(jsn)
#f= open("C:\\artathon\\clone_509919_tree.json","w+")
#f.write(json_obj.__str__())
#f.close()

#print(f.tree)
def start_traverse(d, path=None):
    for item, node in json_obj.items():
        if item == "tree":
            traverse(node)
                    
def traverse(node, level = 0, order = 0):
    seq_ids = {"0" : 0}
    if len(node['data']['seq_ids']) > 0:
        seq_ids = node['data']['seq_ids']

    #print(seq_ids.keys())
    for seq in seq_ids.keys():
        sequnces_data_frame['tree_layer'].loc[sequnces_data_frame['seq_id'] == seq] = level
        sequnces_data_frame['tree_order'].loc[sequnces_data_frame['seq_id'] == seq] = order

 #   print("CHILDREN --> " + len(node['children']).__str__())
    order = 0
    for child in node['children']:
        traverse(child, level+1, order)
        order += 1

start_traverse(json_obj)

sequnces_data_frame.to_pickle("C:\\artathon\\clone_509919_sequences_result.pkl")


###download the clones table from mysql database

# ssh variables
host = 'host url'
localhost = '127.0.0.1'
ssh_username = 'user'
#ssh_private_key = '/path/to/key.pem'


# database variables
user='user'
password='password'
database='database'


#
def query(q):
     with SSHTunnelForwarder(
          (host, 3400),
          ssh_username=ssh_username,
          ssh_password='password',
          remote_bind_address=(localhost, 3306)
     ) as server:
          conn = MySQLdb.connect(host=localhost,
          port=server.local_bind_port,
          user=user,
          passwd=password,
          db=database)
          return pd.read_sql_query(q, conn)


clones_table = query('select * from clones where subject_id = 8')
D207_ALL_with_tissue = query('select * from sequences where subject_id = 8')
D207_collapsed_table = query('select * from sequence_collapsed where subject_id = 8')


###Make dataframe that contains only clone 509919 sequences
clone_509919 = D207_ALL_with_tissue.loc[D207_ALL_with_tissue['clone_id'] == 509919]


###collapse sequences using pandas merge inner
clone_509919_collapsed = clone_509919.merge(D207_collapsed_table, how='inner', left_on='ai', right_on='seq_ai')





###iterate through the json string for clone 509919 and label the sequences with the tree layer they're found in
seq_map = dict()
sequnces_data_frame = pd.read_pickle('path to "sequences" table.pkl')
sequnces_data_frame['tree_layer'] = None
sequnces_data_frame['tree_order'] = None

f = pd.read_pickle('path to "clones" table.pkl')
#json_obj = json.loads(f.tree)
json_obj = 0
for jsn in f.tree:
    json_obj = json.loads(jsn)
#f= open("C:\\artathon\\clone_509919_tree.json","w+")
#f.write(json_obj.__str__())
#f.close()

#print(f.tree)
def start_traverse(d, path=None):
    for item, node in json_obj.items():
        if item == "tree":
            traverse(node)
                    
def traverse(node, level = 0, order = 0):
    seq_ids = {"0" : 0}
    if len(node['data']['seq_ids']) > 0:
        seq_ids = node['data']['seq_ids']

    #print(seq_ids.keys())
    for seq in seq_ids.keys():
        sequnces_data_frame['tree_layer'].loc[sequnces_data_frame['seq_id'] == seq] = level
        sequnces_data_frame['tree_order'].loc[sequnces_data_frame['seq_id'] == seq] = order

 #   print("CHILDREN --> " + len(node['children']).__str__())
    order = 0
    for child in node['children']:
        traverse(child, level+1, order)
        order += 1

start_traverse(json_obj)

sequnces_data_frame.to_pickle("path to save result clone_509919_sequences_result.pkl")