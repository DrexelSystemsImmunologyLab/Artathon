using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PianoTutorial.Common
{
    public interface IViewViewModelMapper
    {
        void RegisterView(string p_viewModelKey, IBaseViewModel p_viewModel);
        object GetViewModel(string p_viewModelKey);
    }
}
