using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{

    public class StockService
    {
        private YIPL_MAContext _yIPL_MAContext;
        public StockRepository _stockRepository = null;
        public StockService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _stockRepository = new StockRepository(DBContext, _yIPL_MAContext);
        }
        public JObject List(JObject request)
        {
            var response = new JObject();
            try
            {
                var StockList = _stockRepository.List(request);
                if (StockList != null)
                {


                    var count = StockList["StockCount"].ToString();
                    if (count != "0")
                    {
                        return StockList;
                    }
                    else
                    {
                        response.Add("Message", "StockList doesn't exist!");
                        return response;
                    }
                }
                else
                {
                    response.Add("Message", "StockList doesn't exist!");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

    }
}
