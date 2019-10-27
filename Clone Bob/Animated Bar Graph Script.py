# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 19:01:52 2019

@author: thsia
"""

import pandas as pd
import numpy as np
from collections import defaultdict

import plotly.io as pio

import plotly.io as pio
from plotly.subplots import make_subplots
import plotly.graph_objects as go 

import pickle


###Load dataframe containing collapsed sequences data
artathon_result = pd.read_pickle('path to collapsed sequences dataframe with layer info added.pkl')


###animated bar graph using Plotly

###make a list of tissues found in dataframe
tissue_list = []
for tissue_key, tissue_value in artathon_result['tissue'].value_counts().iteritems():
    
    tissue_list.append(tissue_key)

###Create new dataframe in graph format
graph_df = pd.DataFrame()
graph_df['layer'] = None
graph_df['tissue'] = None
graph_df['copy_number'] = None


list_layer = []
list_tissue = []
list_copy_number = []


###iterate through the tree_layer values found in the dataframe
index = 0
for layer_key, layer_value in artathon_result['tree_layer'].value_counts(sort=False).iteritems():

    ###for each tissue found in each tree_layer, add the layer, tissue and number of sequences by summing copy_num column
    for tissue in tissue_list:

        list_layer.append(layer_key)
        list_tissue.append(tissue)
        list_copy_number.append(artathon_result['copy_number'].loc[(artathon_result['tissue'] == tissue) & (artathon_result['tree_layer'] == layer_key)].sum())

    index += 1    
  

###add lists to their corresponding column to finish making new dataframe              
graph_df['layer'] = list_layer
graph_df['tissue'] = list_tissue
graph_df['copy_number'] = list_copy_number




###make figure using plotly express px.bar()
fig = px.bar(graph_df, x="tissue", y="copy_number", animation_frame="layer")
fig.update_layout(yaxis_type="log")
    
###save and view graph
pio.write_html(fig, file=r'path to save graph.html', auto_open=True)


