   M S B A M L   `   `   `  ����F  BArtathonGUI, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null)clr-namespace:ArtathonGUIArtathonGUI  5   	       ArtathonGUI.MainWindow   5   	   R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35D 9http://schemas.microsoft.com/winfx/2006/xaml/presentation    5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   +localclr-namespace:ArtathonGUI     5   	   X TXceed.Wpf.Toolkit, Version=2.9.0.0, Culture=neutral, PublicKeyToken=3e4669d2f30244f44xctk)http://schemas.xceed.com/wpf/xaml/toolkit  5   	     � Title$  
Clonalizer��5	   	   $
��1080��6   $
��1920��6*   .��5
      � ���	#FF1C1C1E.+�5   
   �� $��
Clonalizer��6   $��Center=�6%   $	��Top=�6B   
�������$	��100(�6t   $��Adobe Gothic Std)�6�   $��0,30,0,0q�6�   )   #ArtathonGUI.CreateAPointLine3DChart  5   
   $��Center=�6(   $��0,30,0,0q�6C   $	��800��6U   $	��450��6a   6p   � 5   
   $��Center=�6   $
��Left=�6*   $��50,0,0,0q�6E    � RowDefinitions 5      �� 5      $��50 �6    �� 5      $��50 �6    �� 5      $��50 �6    �� 5      $��50 �6    �� 5      $��50 �6    �� 5      $��50 �6    .+�5      �� $��5��6   $	��140��6#   $��30��6/   $��	Show Data��6;   $��Right=�6s   ��6O   �� *ShowDataCommand+6s   �� 5      $��5��6   $	��140��6"   $��30��6.   $��Connect Socket��6:   $
��Left=�6|   ��6S   �� *ConnectSocketCommand+6|   �� 5      $��0��6   
�������$��
Feature 1:��6;   $
��Left=�6P   $��Center=�6k   �� 5      $��0��6   $��40��6$   $	��230��60   $��Right=�6�   ��6<   �� *FeaturesNames+ �� SelectedItem 6b   �� *
Feature1+6�   �� 5      $��1��6   
�������$��
Feature 2:��6;   $
��Left=�6P   $��Center=�6k   �� 5      $��1��6   $��40��6$   $	��230��60   $��Right=�6�   ��6<   �� *FeaturesNames+ 6b   �� *
Feature2+6�   �� 5      $��2��6   
�������$��
Feature 3:��6;   $
��Left=�6P   $��Center=�6k   �� 5       $��2��6   $��40��6$   $	��230��60   $��Right=�6�   ��6<   �� *FeaturesNames+ 6b   �� *
Feature3+6�   �� 5"      $��3��6   
�������$
��Size��6;   $��Center=�6J   $
��Left=�6e   �� 5#      $��3��6    � Minimum$ 1Q�6"    � Maximum$ 6Q�6.   $	��250��6U   $��30��6a   $��Right=�6m   $��	0,10,15,0q�6�    � Value 6:   �� *
DataSize+6�   #  Xceed.Wpf.Toolkit.ColorPicker  5%      -   5        $��ClrPcker_Background��5&      $��4��5%      $	��300��6,   $��30��68      SelectedColor 5'      �� *SelectedColor+5*      5+      5,      