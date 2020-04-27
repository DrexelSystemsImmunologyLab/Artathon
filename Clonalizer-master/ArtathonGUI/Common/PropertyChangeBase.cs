using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Runtime.Serialization;
using Caliburn.Micro;

namespace PianoTutorial.Common
{
    [Serializable]
    public class PropertyChangeBase : INotifyPropertyChanged , INotifyPropertyChangedEx
    {
        [NonSerialized] private bool isNotifying;

        [Browsable(false)]
        public bool IsNotifying
        {
            get { return isNotifying; }
            set { this.isNotifying = value; }
        }

        public event PropertyChangedEventHandler PropertyChanged = (Parm0, Parm1) => { };
        public PropertyChangeBase()
        {
            this.IsNotifying = true;
        }

        public void Refresh()
        {
            this.NotifyOfPropertyChange(string.Empty);
        }

        public virtual void NotifyOfPropertyChange([CallerMemberName] string PropertyName = "")
        {
            if (!this.IsNotifying) return;
            Execute.OnUIThread((System.Action)(()=>this.OnPropertyChanged (new PropertyChangedEventArgs(PropertyName))))
            ;

        }

        public void NotifyOfPropertyChange<TProperty>(Expression<Func<TProperty>> Property)
        {
            this.NotifyOfPropertyChange(ExtensionMethods.GetMemberInfo((Expression) Property).Name);
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        protected void OnPropertyChanged(PropertyChangedEventArgs e)
        {
            PropertyChangedEventHandler changedEventHandler = this.PropertyChanged;
            if (changedEventHandler == null) return;
            changedEventHandler((object) this, e);
        }

        [OnDeserialized]
        public void OnDesrialized(StreamingContext c)
        {
            this.IsNotifying = true;
        }

        public virtual bool ShouldSerializeIsNotifying()
        {
            return false;
        }
    }
}
