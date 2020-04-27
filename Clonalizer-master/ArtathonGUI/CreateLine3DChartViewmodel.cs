using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;
using System.Windows.Media;
using SciChart.Charting3D.Model;

namespace ArtathonGUI
{
    class CreateLine3DChartViewmodel : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;
        private ICommand m_clickCommand;
        private bool _canExecute = true;
        public XyzDataSeries3D<double> m_xyzDataSeries3D = new XyzDataSeries3D<double>() { SeriesName = "Colorful Bubble!" };
        public CreateLine3DChartViewmodel()
        {
            //XyzDataSeries3D<double> xyzDataSeries3D = new XyzDataSeries3D<double>() { SeriesName = "Colorful Bubble!" };
            //var random = new Random(0);

            //for (var i = 0; i < 100; i++)
            //{
            //    var x = 5 * Math.Sin(i);
            //    var y = i;
            //    var z = 5 * Math.Cos(i);

            //    Color? randomColor = Color.FromArgb(0xFF, (byte)random.Next(50, 255), (byte)random.Next(50, 255), (byte)random.Next(50, 255));
            //    var scale = (float)((random.NextDouble() + 0.5) * 3.0);

            //    xyzDataSeries3D.Append(x, y, z, new PointMetadata3D(randomColor, scale));
            //}

            //DataSeriesCommand = xyzDataSeries3D;
        }

        public XyzDataSeries3D<double> DataSeriesCommand
        {
            get { return m_xyzDataSeries3D; }
            set
            {
                m_xyzDataSeries3D = value;
                NotifyPropertyChanged("DataSeriesCommand");
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
}
