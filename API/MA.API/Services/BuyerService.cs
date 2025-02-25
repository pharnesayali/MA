using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;

namespace MA.API.Services
{
    public class BuyerService
    {
       // public BuyerRepository _buyerRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public BuyerService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            //_buyerRepository = new BuyerRepository(DBContext, _yIPL_MAContext);
        }
        public  List<string> GetGrnList()
        {
            return null;
        }

    }
}
