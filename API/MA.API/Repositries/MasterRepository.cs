using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class MasterRepository
    {

        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public MasterRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }
        public List<MPlant> List()
        {
            return _yIPL_MAContext.MPlants.ToList();
        }

        public List<MMovementType> GetMovementType()
        {
            return _yIPL_MAContext.MMovementTypes.ToList();
        }

        public List<WeekDate> GetWeekDate()
        {

            return _DBContext.RetrieveEntities<WeekDate>(@"select Id, Year,Week_Number As WeekNumber, Date_From as DateFrom, Date_To As DateTo from Week_Date where year(GETDATE()) = year(Date_From) and year(GETDATE())= year(Date_To)", CommandType.Text, null).ToList();

        }

        public WeekDate GetCurrentWeekDate()
        {
            //return _yIPL_MAContext.WeekDates.Where(x => x.DateFrom >= DateTime.Now).ToList();
            return _DBContext.RetrieveEntities<WeekDate>(@"select * from Week_Date where GETDATE() between Date_From and Date_To
", CommandType.Text, null).FirstOrDefault();
        }

        public JObject GetConsumptionReport(JObject request)
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
                pagingCriteria.PageNumberToFetch = 1;
            }


            var querry = @"Select * from ConsumptionReport where ConsumptionDate >='" + Convert.ToString(request["StartDate"]) + "'"
                + " And ConsumptionDate<= '" + Convert.ToString(request["EndDate"]) + "'";
            var result = _DBContext.RetrieveEntities<ConsumptionReport>(querry, CommandType.Text, null);
            if (result == null)
            {
                return null;
            }
            if (result.Count == 0)
            {
                return null;
            }
            var resposne = new JObject();

            resposne.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resposne.Add("Result", JArray.FromObject(result));
            return resposne;
        }


        public JObject GetCompleteFiles()
        {
         var querry = @"select FileType,Date,Status from filetoprocess where Status='Complete' order by Date Desc";
         var result = _DBContext.RetrieveEntities<FileToProcess>(querry, CommandType.Text, null);
            if (result == null)
            {
                return null;
            }

            if (result.Count==0)
            {
                return null;
            }

            foreach(var item in result)
            {
                
                if(!String.IsNullOrWhiteSpace(item.FileType))
                {

                    var type = item.FileType;
                    switch (type) {


                        case "M_Items": item.FileType = "Item_Master";
                            break;
                        case "M_ItemSupplier":
                            item.FileType = "Item Supplier Master";
                            break;

                        case "DailyShipment":
                            item.FileType = "Daily Shipment";
                            break;


                        case "Plant_supplier_master":
                            item.FileType = "Plant Supplier Master";
                            break;

                        case "StockInHand":
                            item.FileType = "Stock";
                            break;

                    }
                }
            }
            var resposne = new JObject();

            
            resposne.Add("Result", JArray.FromObject(result));
            return resposne;
        }

        public JObject GetDailyshipment(JObject request)
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
                pagingCriteria.PageNumberToFetch = 1;
            }

            var result = _DBContext.RetrieveEntities<Dailyshipment>(@"Select * from dbo.Dailyshipment  where InvoiceDate >='" + (Convert.ToString(request["StartDate"])??DateTime.UtcNow.Date.ToString()) + "'"
                + " And InvoiceDate<= '" + (Convert.ToString(request["EndDate"]) ?? DateTime.UtcNow.Date.ToString()) + "'", CommandType.Text, null);

            if (result == null)
            {
                return null;
            }
            if (result.Count == 0)
            {
                return null;
            }
            var resposne = new JObject();

            resposne.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resposne.Add("Result", JArray.FromObject(result));
            return resposne;
        }
    

    public JObject GetInventoryCorrection(JObject request)
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
            pagingCriteria.PageNumberToFetch = 1;
        }

        var result = _DBContext.RetrieveEntities<InventoryCorrection>(@"Select *, (select Description from M_Items where ItemCode = i.Itemcode) AS Description from dbo.InventoryCorrection i where PostingDate >='" + Convert.ToString(request["StartDate"]) + "'"
            + " And PostingDate<= '" + Convert.ToString(request["EndDate"]) + "'", CommandType.Text, null);
        if (result == null)
        {
            return null;
        }
        if (result.Count == 0)
        {
            return null;
        }
        var resposne = new JObject();

        resposne.Add("Count", result.Count);
        result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
        resposne.Add("Result", JArray.FromObject(result));
        return resposne;
    }
}

}






