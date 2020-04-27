using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using SciChart.Charting3D.Model;

namespace ArtathonGUI
{
    public partial class CreateAPointLine3DChart : UserControl
    {
        private const int Count = 100;
        private CreateLine3DChartViewmodel m_createLine3DChartViewmodel;

        public CreateAPointLine3DChart()
        {
            InitializeComponent();
            m_createLine3DChartViewmodel = new CreateLine3DChartViewmodel();
            this.DataContext = m_createLine3DChartViewmodel;
            MainWindowViewmodel.m_createLine3DChartViewmodel = m_createLine3DChartViewmodel;
        }
    }
}




