using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace PianoTutorial.Common
{
    public interface IBaseViewModel
    {
        event PropertyChangedEventHandler PropertyChanged;
        void NotifyOfPropertyChange(string PropertyName);
        void NotifyOfPropertyChange<TProperty>(Expression<Func<TProperty>> Property);
    }
}
