using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class GITRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public GITRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public JObject Get(JObject request)
        {

            var pagingCriteria = new PagingCriteria();
            if (request["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(request["PageCriteria"]));
            }

            if (pagingCriteria == null)
            {
                pagingCriteria = new PagingCriteria();
                pagingCriteria.PageSize = 10;
                pagingCriteria.PageNumberToFetch = 0;
            }
            var result = _DBContext.RetrieveEntities<v_Receipt_WeekWise>("Select r.*,(select Description from M_Items where ItemCode= r.ItemCode) As Description  from v_Receipt_WeekWise r", CommandType.Text, null);
            ;


            var result2 = _DBContext.GetDataTable("select CONCAT('W',Week_Number) As Week , Year,Date_From, Date_To  from Week_Date Order by year desc,Week_Number", CommandType.Text, null);
            if (!String.IsNullOrEmpty(Convert.ToString(request["PlantCode"])))
            {
                result = result.Where(x => x.PlantCode == Convert.ToString(request["PlantCode"])).ToList();
            }
          
            
            if (!String.IsNullOrEmpty(Convert.ToString(request["ItemCode"])))
            {
                result = result.Where(x => x.ItemCode == Convert.ToString(request["ItemCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["Year"])))
            {
                result = result.Where(x => x.Year == Convert.ToInt32(request["Year"])).ToList();
            }


            var resultdata = new JObject();

            resultdata.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("List", JArray.FromObject(result));
            resultdata.Add("WeekList", JArray.FromObject(result2));
            return resultdata;
        }
    }
}
