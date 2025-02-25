using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class ITRRepository
    {

        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public ITRRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public List<ITRModel> Get()
        {
            var response = new JObject();
            var result = _DBContext.RetrieveEntities<ITRModel>(@"select  null as startDate, Zone , '' as PlantCode,SUM(Moving) as Moving, SUM(slow_moving) as slow_moving , SUM(non_moving) as non_moving , SUM(salesValue) as salesValue , SUM(ITR) as ITR , SUM(totalValue) as totalValue , '' as CreatedDate,'' As Revision from  ITR where month(startdate)=month(GETDATE()) group by zone  union select * from itr where month(startdate)=month(GETDATE()) ORDER BY startdate desc ", CommandType.Text, null);
            if (result != null)
            {
                result = result.OrderBy(x=>x.Zone).ToList();
                result.Add(_DBContext.RetrieveEntities<ITRModel>(@"select  '' as startDate,  '' as PlantCode,
SUM(Moving) as Moving, SUM(slow_moving) as slow_moving , SUM(non_moving) as non_moving , SUM(salesValue) as salesValue , SUM(ITR) as ITR , SUM(totalValue) as totalValue
from  ITR  where month(startdate)=month(GETDATE())", CommandType.Text, null).FirstOrDefault());
            }

            return result;

        }

        public JArray Report()
        {
            var response = new JArray();
           
                //var result = _DBContext.RetrieveEntities<ITRModel>(@"select  null as startDate, Zone , '' as PlantCode,SUM(Moving) as Moving, SUM(slow_moving) as slow_moving , SUM(non_moving) as non_moving , SUM(salesValue) as salesValue , SUM(ITR) as ITR , SUM(totalValue) as totalValue , '' as CreatedDate,'' As Revision from ITR where Month(startDate)=" + i + "  group by zone  union select * from itr where Month(startDate)=" + i + "  ORDER BY startdate desc", CommandType.Text, null);
                var result = _DBContext.RetrieveEntities<ITRModel>(@"Select * from itr", CommandType.Text, null);
                if (result != null)
                {
                    var distictResult = result.DistinctBy(a => (a.Zone, a.PlantCode));
                    
                    foreach (var item in distictResult)
                    {
                        var obj = new JObject();
                        obj.Add("plantCode", item.PlantCode);
                        obj.Add("Zone", item.Zone);
                        var temp = result.Where(a => a.PlantCode == item.PlantCode)
                            .Where(a => a.Zone == item.Zone);
                        foreach (var item2 in temp)
                        {
                            var month = item2.startDate.Month;
                            obj.Add(month + "_Moving", item.Moving);
                            obj.Add(month + "_slow_moving", item.slow_moving);
                            obj.Add(month + "_startDate", item.startDate);
                            obj.Add(month + "_non_moving", item.non_moving);
                            obj.Add(month + "_salesValue", item.salesValue);
                            obj.Add(month + "_ITR", item.ITR);
                            obj.Add(month + "_totalValue", item.totalValue);
                            obj.Add(month + "_CreatedDate", item.CreatedDate);
                            obj.Add(month + "_Revision", item.Revision);

                        }

                        response.Add(obj);

                    }


                }

                
            
            return response;
        }

        public List<ITRModel> Get(JObject request)
        {
            var iTRModels = _DBContext.RetrieveEntities<ITRModel>(@"Select * from dbo.itr where month(startDate)="+Convert.ToString(request["month"])+"and Revision=" + Convert.ToString(request["Revision"]), CommandType.Text, null);

            if (iTRModels != null)
            {
                return iTRModels;
            }
            else
            {
                return null;
            }
        }
        public List<int> GetRevision(JObject request)
        {
            var revisions = _DBContext.RetrieveEntities<ITRModel>(@"select * from ITR where MONTH(startDate)=" + Convert.ToString(request["month"]), CommandType.Text, null);


            if (revisions != null)
            {
                return revisions.Select(x => x.Revision).Distinct().ToList();
            }
            else
            {
                return null;
            }
        }

        public int Generate()
        {
            return _DBContext.UpdateWithRecordsAffected("Create_ITR", CommandType.StoredProcedure, null);
        }

        public int Update(JArray data)
        {
            int count = 0;
            foreach (JObject item in data)
            {
                count+= _DBContext.UpdateWithRecordsAffected(@"update ITR set salesValue=" + Convert.ToString(item["salesValue"]) + "where startDate='" + Convert.ToString(item["startDate"]) + "' and Zone='" + Convert.ToString(item["Zone"]) + "' and PlantCode='" + Convert.ToString(item["PlantCode"]) + "' and Revision='" + Convert.ToString(item["Revision"]) + "'", CommandType.Text, null);
            }
            return count;
        }
    }
}
