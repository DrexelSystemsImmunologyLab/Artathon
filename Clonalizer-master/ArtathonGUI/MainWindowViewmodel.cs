using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Media;
using Chains.Play.Installation;
using SciChart.Charting3D.Model;

namespace ArtathonGUI
{
    class MainWindowViewmodel : INotifyPropertyChanged
    {
        public static CreateLine3DChartViewmodel m_createLine3DChartViewmodel;
        public event PropertyChangedEventHandler PropertyChanged;
        private ICommand m_clickCommand;
        private bool _canExecute = true;
        private ICommand m_connectSocketCommand;
        private bool m_connectSocketCanExecute = true;
        private ICommand m_showDataCommand;
        public XyzDataSeries3D<double> m_xyzDataSeries3D = new XyzDataSeries3D<double>() { SeriesName = "Colorful Bubble!" };
        private bool m_showDataCanExecute = true;
        private string m_str = "its work!";
        private List<string> m_featuresNames = new List<string>(){"Longest path","# of nodes in depth i","Max # of childs"};
        private string m_feature1;
        private string m_feature2;
        private string m_feature3;
        private int m_dataSize = 3;
        private Color? m_colorSelected = new Color();
        private List<List<double>> m_featuresList = new List<List<double>>()
        {
            new List<double>(){1,2,3,4},
            new List<double>(){3,2,3,4},
            new List<double>(){10,10,10,10},
            new List<double>(){13,12,13,14}
        };

        public Color? SelectedColor
        {
            get { return m_colorSelected; }
            set { m_colorSelected = value; }
        }

        public string TextCommand
        {
            get { return m_str; }
            set
            {
                m_str = value;
                NotifyPropertyChanged("TextCommand");
            }
        }

        private void ButtonClicked()
        {
            XyzDataSeries3D<double> xyzDataSeries3D = new XyzDataSeries3D<double>() { SeriesName = "Colorful Bubble!" };
            var random = new Random(0);
            int index_x=0, index_y=0, index_z=0;
            int counter = 0;
            foreach (var name in m_featuresNames)
            {
                if (name == m_feature1)
                    index_x = counter;
                if (name == m_feature2)
                    index_y = counter;
                if (name == m_feature3)
                    index_z = counter;
                counter++;
            }

            if (m_feature1 != "" && m_feature2 != "" && m_feature3 != "")
            {
                foreach (var f_list in m_featuresList)
                {
                    var x = f_list[index_x];
                    var y = f_list[index_y];
                    var z = f_list[index_z];

                    Color? randomColor = Color.FromArgb(0xFF, (byte)random.Next(50, 255), (byte)random.Next(50, 255), (byte)random.Next(50, 255));
                    var scale = (float)(m_dataSize);

                    xyzDataSeries3D.Append(x, y, z, new PointMetadata3D(randomColor, scale));
                }

            }

            m_createLine3DChartViewmodel.DataSeriesCommand = xyzDataSeries3D;

            FeaturesNames = m_featuresNames;
        }

        public List<string> FeaturesNames
        {
            get { return m_featuresNames; }
            set
            {
                m_featuresNames = value;
                NotifyPropertyChanged("FeaturesNames");
            }
        }

        private void getData()
        {
            var res = AsynchronousClient.StartClient();
            List<List<double>> tmp = new List<List<double>>();
            foreach (var l in res)
            {
                tmp.Add(l.Value);
            }

            m_featuresList = tmp;
        }

        public int DataSize
        {
            get { return m_dataSize; }
            set { m_dataSize = value; }
        }

        public string Feature1
        {
            get { return m_feature1; }
            set { m_feature1 = value; }
        }

        public string Feature2
        {
            get { return m_feature2; }
            set { m_feature2 = value; }
        }

        public string Feature3
        {
            get { return m_feature3; }
            set { m_feature3 = value; }
        }

        public ICommand ButtonCommand
        {
            get
            {
                return m_clickCommand ?? (m_clickCommand = new CommandHandler(() => ButtonClicked(), _canExecute));
            }
        }

        public ICommand ShowDataCommand
        {
            get
            {
                return m_showDataCommand ?? (m_showDataCommand = new CommandHandler(() => ButtonClicked(), m_showDataCanExecute));
            }
        }

        public ICommand ConnectSocketCommand
        {
            get
            {
                return m_connectSocketCommand ?? (m_connectSocketCommand =
                           new CommandHandler(() => getData(), m_connectSocketCanExecute));
            }
        }

        /// <summary>
        ///  NotifyPropertyChanged implementation
        /// </summary>
        /// <param name="info"></param>
        private void NotifyPropertyChanged(String info)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(info));
            }
        }
    }

    /// <summary>
    /// class CommandHandler
    /// </summary>
    public class CommandHandler : ICommand
    {
        private Action _action;
        private bool _canExecute;
        public CommandHandler(Action action, bool canExecute)
        {
            _action = action;
            _canExecute = canExecute;
        }

        public bool CanExecute(object parameter)
        {
            return _canExecute;
        }

        public event EventHandler CanExecuteChanged;

        public void Execute(object parameter)
        {
            _action();
        }

        public void CloseApplication()
        {
            //  m_chordListViewModel.Dispose();
            //m_songListViewModel.Dispose();
            //m_settingsWindowViewModel.Dispose();

            //m_pianoControlViewMode.Dispose();
        }
    }
}
