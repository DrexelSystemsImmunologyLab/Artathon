using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reactive.Disposables;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Caliburn.Micro;

namespace PianoTutorial.Common
{
    public abstract class BaseViewModel : PropertyChangeBase , IBaseViewModel,IDisposable
    {
        protected Guid m_viewModelToken = Guid.NewGuid();
        protected CompositeDisposable m_subscriptions = new CompositeDisposable();
        //protected ICommandDataService m_commandDataService;

        protected BaseViewModel(/*ICommandDataService p_commandDataService*/)
        {
            //this.m_commandDataService = p_commandDataService;
        }

        //protected BaseViewModel(){}

        [Obsolete("Use Dispose intead")]
        public virtual void ShutDown()
        {
            if (this.m_subscriptions.IsDisposed) return;
            this.m_subscriptions.Dispose();
        }

        public virtual void Dispose()
        {
            if (this.m_subscriptions.IsDisposed) return;
            this.m_subscriptions.Dispose();
        }

        protected virtual void Init()
        {
            this.RegisterCommands();
            this.RegisterEvents();
        }

        protected virtual void RegisterEvents() { }
        protected virtual void RegisterCommands() { }

        void IBaseViewModel.NotifyOfPropertyChange<TProperty>([In] Expression<Func<TProperty>> obj0)
        {
            this.NotifyOfPropertyChange<TProperty>(obj0);
        }
    }
}
