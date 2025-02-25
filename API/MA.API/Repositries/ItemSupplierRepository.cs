
using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{

    public class ItemSupplierRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public ItemSupplierRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
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

            var result = _DBContext.RetrieveEntities<M_PlantItemSupplierExt>(@"Select p.*, (select Count(itemCode) from M_PlantItemSupplier where ItemCode = p.ItemCode) As count  from M_PlantItemSupplier p", CommandType.Text,null);
            if (result == null)
            {
                return null;
            }
        
            
            if (!String.IsNullOrEmpty(Convert.ToString(request["PlantCode"])))
            {
               result = result.Where(x => x.PlantCode == Convert.ToString(request["PlantCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["SupplierCode"])))
            {
                result = result.Where(x => x.SupplierCode == Convert.ToString(request["SupplierCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["ItemCode"])))
            {
                result = result.Where(x => x.ItemCode == Convert.ToString(request["ItemCode"])).ToList();
            }
            if (result.Count == 0)
            {
                return null;
            }
            var resultdata = new JObject();

            resultdata.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("List", JArray.FromObject(result));
            return resultdata;

           // return result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
        }
        public List<MPlantItemSupplier> Get(JObject data)
        {
            string JSONresult = JsonConvert.SerializeObject(data["PlantCodes"]);
            JSONresult = JSONresult.Replace("[", " ");
            JSONresult = JSONresult.Replace("]", " ");
            return _DBContext.RetrieveEntities<MPlantItemSupplier>(@"select * from [dbo].[M_PlantItemSupplier]  WHERE  PlantCode IN (" + JSONresult + ")", CommandType.Text, null);
        }

        public int Update(JObject data)
        {
            var itemSupplier = data["data"];
            var i = 0;
            foreach (var item in itemSupplier)
            {
                var sob = Convert.ToDecimal(item["SOB"]);
                var id = Convert.ToInt32(item["id"]);
                var query = @"update M_PlantItemSupplier set SOB=" + sob + "where Id=" + id;
                _DBContext.Update(query, CommandType.Text, null);
                i++;
            }
            return i;
        }
        public JObject GetByPlant(JObject data)
        {
            try
            {
                var result = _DBContext.RetrieveEntities <MPlantItemSupplier>(@"select DISTINCT SupplierCode,SupplierName,PlantCode from [dbo].[M_PlantItemSupplier] where PlantCode in(" + data["plant"] +")", CommandType.Text, null);
                var response= new JObject();
                if(result == null)
                {
                    return null;
                }
                response.Add("Response", JArray.FromObject(result));
                return response;


            }
            catch (Exception e)
            {
                throw e;
            }
        }
        

    }
}
