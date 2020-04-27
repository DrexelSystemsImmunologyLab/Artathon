using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PianoTutorial.Common
{
    class ViewViewModelMapper : IViewViewModelMapper
    {
        protected IDictionary<string,IBaseViewModel> m_viewViewModelMapping { get; private set; }

        public ViewViewModelMapper()
        {
            this.m_viewViewModelMapping = (IDictionary<string, IBaseViewModel>) new Dictionary<string, IBaseViewModel>();
        }

        public void RegisterView(string p_viewModelKey, IBaseViewModel p_viewModel)
        {
            if (!(p_viewModel is BaseViewModel))
            {
                Exception exception = (Exception) new InvalidOperationException(string.Format("register viewModel is not from the right type"));
                throw exception;
            }
            this.m_viewViewModelMapping[p_viewModelKey] = p_viewModel;
        }

        public object GetViewModel(string p_viewModelKey)
        {
            if (!this.m_viewViewModelMapping.ContainsKey(p_viewModelKey))
            {
                Exception exception = (Exception)new InvalidOperationException(string.Format("ViewModelKey\"{0}\" was not found in mapper check if it was registered",(object)p_viewModelKey));
                throw exception;
            }
            return (object) this.m_viewViewModelMapping[p_viewModelKey];
        }
    }
}
