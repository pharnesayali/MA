using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class StockRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public StockRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }
        public JObject List(JObject request)
        {
            var pagingCriteria = new PagingCriteria();
            if (request["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(request["PageCriteria"]));
            }

           
            //var result = _yIPL_MAContext.TotalStocks.ToList();
            var result = _DBContext.RetrieveEntities<TotalStockExt>(@"Select T.*, (Select Description from M_Items where ItemCode=T.ItemCode) 
            As Description  from TotalStock T;", CommandType.Text, null);
            if(result== null)
            {
                return null;
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["PlantCode"])))
            {
                result = result.Where(x => x.PlantCode == Convert.ToString(request["PlantCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["ItemCode"])))
            {
                result = result.Where(x => x.ItemCode == Convert.ToString(request["ItemCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["SLOC"])))
            {
                result = result.Where(x => x.SLOC == Convert.ToString(request["SLOC"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["FromDate"])))
            {
                result = result.Where(x => x.Date.Date >= Convert.ToDateTime(request["FromDate"]).Date).ToList();
                if (!String.IsNullOrEmpty(Convert.ToString(request["ToDate"])))
                {
                    result = result.Where(x => x.Date.Date <= Convert.ToDateTime(request["ToDate"]).Date).ToList();
                }
            }
            else
            {

                result = result.Where(x => x.Date == DateTime.Today).ToList();
                
            }

            var resultdata = new JObject();

            resultdata.Add("StockCount", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("StockList", JArray.FromObject(result));
            return resultdata;
        }

    }
}
