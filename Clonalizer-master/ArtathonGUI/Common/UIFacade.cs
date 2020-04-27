using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PianoTutorial.Common
{
    public static class UIFacade
    {
        public static IViewViewModelMapper TheViewViewModelMapper { get; private set; }
        //public static ICommandDataService CommandDataService { get; private set; }
        public static void Init(IViewViewModelMapper p_viewViewModelMapper)
        {
            UIFacade.TheViewViewModelMapper = p_viewViewModelMapper;
        }
    }
}
