import json
import config as c
import numpy as np

# todo: we need to use pandas to improve the performance of analysis
import pandas 
import immunedb.common.config as config
from immunedb.common.models import Clone

def get_file_rows(file_path):
    with open(file_path) as f:
        rows = [line for line in f]
    rows_final = []
    for i in range(len(rows)):
        if i == 0:
            continue
        row = rows[i]
        fields_counter = 0
        for j in range(len(row)):
            if row[j] == ',':
                fields_counter += 1
                if not fields_counter == c.headers_to_num_dict['tree']:
                    continue
                else:
                    first_part = row[0:j+1]
                    first_part = np.asarray(first_part.split(','))
                    first_part_final = first_part[0:len(first_part)-1]
                    second_part = row[j+1:len(row)].replace('""', '"').strip()
                    second_part = second_part[1:len(second_part)-1]
                    second_part_final = json.loads(second_part)
                    row_final = np.append(first_part_final, second_part_final)
                    rows_final.append(row_final)

    return np.asarray(rows_final)

def get_clones_from_remote_db():
    session = config.init_db({
        'host': '35.241.233.255',
        'database': 'influenza',
        'username': 'artathon',
        'password': '',
    })

    rows_final = []
    counter = 10

    for clone in session.query(Clone):
        row_final = np.append(clone.id, clone.tree)
        rows_final.append(row_final)
        # 
        if counter > 0:
            counter = counter - 1
            print(clone.id)
        else:
            return np.asarray(rows_final)

def get_longest_path_size(tree, level=0):
    keys = tree.keys()
    if 'children' not in keys or len(tree['children']) == 0:
        return level + 1
    sizes = []
    for child in tree['children']:
        size = get_longest_path_size(child, level)
        sizes.append(size)
    return max(sizes) + 1

def get_feature_vectors_from_rows(rows):
    feature_vectors_final = []
    for row in rows:
        tree = row[c.headers_to_num_dict['tree']]['tree']
        longest_path_size = get_longest_path_size(tree)
        #maximum_nodes_in_depth = get_maximum_nodes_in_depth(tree, c.feature_vectors_dict['depth'])
        #maximum_number_of_childs = get_maximum_number_of_childs(tree)
        #feature_vector = [longest_path_size, maximum_nodes_in_depth, maximum_number_of_childs]

        #feature_vectors_final.append(feature_vector)

        # todo: other ideas of features
        # for trees: depth, branches, leaves, weight on edges (#mutations), no of children/brothers;
        # for clones: (we need more...)

    return np.asarray(feature_vectors_final)

if __name__ == '__main__':
    # rows = get_file_rows(c.clone_file_path)
    rows = get_clones_from_remote_db()
    # feature_vectors = get_feature_vectors_from_rows(rows)
