using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;

using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class ItemRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public ItemRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
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


            var result = _DBContext.RetrieveEntities<MitemExt>(@"SELECT I.*, (SELECT TOP 1 SupplierCode  FROM M_ItemSupplier Where IsActive = 1 AND ItemCode = I.ItemCode) As SupplierCode,
              (SELECT TOP 1 SupplierName  FROM M_ItemSupplier Where IsActive = 1 AND ItemCode = I.ItemCode) As SupplierName,
			  (SELECT TOP 1 SupplierCode  FROM M_ItemSupplier Where IsActive = 0 AND ItemCode = I.ItemCode Order BY StartDate DESC) OldSupplierCode,
			  (SELECT TOP 1 EndDate FROM M_ItemSupplier Where IsActive = 0 AND ItemCode = I.ItemCode Order BY StartDate DESC) As SourceChangedate,
               (SELECT TOP 1 SupplierName  FROM M_ItemSupplier Where IsActive = 0 AND ItemCode = I.ItemCode  Order BY StartDate DESC) As OldSupplierName
            FROM M_Items I", CommandType.Text, null);

            if (result == null)
            {
                return null;
            }

            
            if (!String.IsNullOrEmpty(Convert.ToString(request["PartNo"])))
            {
               result=  result.Where(x => x.ItemCode.Equals(Convert.ToString(request["PartNo"]), StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["ParentPart"])))
            {
               result=  result.Where(x => x.ParentPart.Equals(Convert.ToString(request["ParentPart"]), StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["SuppierCode"])))
            {
               result= result.Where(x => x.SupplierCode.Equals(Convert.ToString(request["SuppierCode"]), StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["SupplierName"])))
            {
                result = result.Where(x => x.SupplierName.Equals(Convert.ToString(request["SupplierName"]), StringComparison.OrdinalIgnoreCase)).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["Source"])))
            {
                result= result.Where(x => x.Source.Equals(Convert.ToString(request["Source"]), StringComparison.OrdinalIgnoreCase)).ToList();
            }

            var resultdata = new JObject();

            resultdata.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("List", JArray.FromObject(result));
            return resultdata;

        }

        public JObject Delete(int id)
        {

            var query = "update M_Items set IsActive = 'false' where id ="+id;
            int temp =_DBContext.UpdateWithRecordsAffected(query, CommandType.Text, null);
            JObject obj = new JObject();
            if(temp>0)
            {
                obj.Add("Deleted", true);
                obj.Add("Message", "Delete successfull");
            }
            else
            {
                obj.Add("Deleted", false);
                obj.Add("Message", "Delete failed");
            }
            
            return obj;
        }


    }
}
