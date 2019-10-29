We are Clone Bob for Arthathon 2019!

Members: Thomas Hsiao, Michael Faber, , Michael Koren, Adeeb Gmal.

Dataset: Atlas

Files:
  Graphics: Images used to make PowerPoint animation.
  Animated Bar Graph Script.py: Python script for making an animated bar graph using Plotly.
  Animated_Bar_1.html: The animated bar graph.
  Animation.pptx: The PowerPoint animation used for the presentation.
  Collapse and Label Sequences Script.py: Script for collapsing sequences and labeling them with the tree layer they're found in.
  

Overview: We designed and created a graphic to visualize the tissue distribution of clones as their clonal trees grow.

Progress: First, our code takes the "sequences" table from the Lp13 database and collapses its sequences using the "collapse" table (also
from the Lp13 database) and also removed all subjects except for D207 (subject 8). Next, our code iterates through a clone's json tree 
(from the "clones" table) and labels each sequence with the tree layer it is found in.

Having labeled each sequence with where it is found in its tree, we made a bar graph that plots how many sequences are found in
each tissue at a given tree layer. Since we did not have enough time to actually make the visualization, we made a PowerPoint animation 
to demonstrate our goal. The animation, which is consistent with the real data, shows circles (the circles represent the clone 
in the tissues, and its size represents how many sequences are in the circle) migrating through the body as time, or tree layer, progresses.

Future steps: Make a visualization that is similar to the PowerPoint animation and link the data to it, so that any clone (or multiple
clones) can be selected to view its tissue distribution animation.

In addition, our code only builds a table for one clone. This code can easily be adapted to label sequences for all clones.

Finally, we would like to add filters and additional graphs for more specific visualizations of the clones. For example, a filter
coud be added that allows the user to see nodes that contain a specific number or range of sequences.
