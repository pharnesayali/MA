using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
//using NPOI.OpenXmlFormats.Dml;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class OrderRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public OrderRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }


        public JObject List(JObject data)
        {
            var pagingCriteria = new PagingCriteria();
            if (data["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(data["PageCriteria"]));
            }

            if (pagingCriteria == null)
            {
                pagingCriteria = new PagingCriteria();
                pagingCriteria.PageSize = 10;
                pagingCriteria.PageNumberToFetch = 1;
            }
            var list = new JArray();

            var orderList = _yIPL_MAContext.OrderDetail.ToList();


            if (!String.IsNullOrEmpty(Convert.ToString(data["BuyerCode"])))
            {
                orderList = orderList.Where(x => x.BuyerCode == Convert.ToString(data["BuyerCode"])).ToList();
            }
            
            var query = orderList.Count;
            orderList = orderList.OrderByDescending(x=>x.CreatedOn).Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();

            var resultdata = new JObject();

            resultdata.Add("OrderDetailCount", query);
            resultdata.Add("OrderDetailList", JArray.FromObject(orderList));
            return resultdata;
        }
        public List<OrderDetail> View(JObject data)
        {
            return _yIPL_MAContext.OrderDetail.Where(x => x.OrderId == Convert.ToInt32(data["OrderId"])).ToList();
        }

        public bool Create(Order order)
        {
            this._yIPL_MAContext.Order.Add(order);
            var i = this._yIPL_MAContext.SaveChanges();
            if (i == 1)
            {
                
                var res = _DBContext.GetScalarValue("[dbo].[Calculate_Orders]", CommandType.StoredProcedure, null);
                return true;
                

            }
            else
            {
                return false;
            }

        }

        public JObject Get(JObject data)
        {
            var pagingCriteria = new PagingCriteria();
            if (data["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(data["PageCriteria"]));
            }

            if (pagingCriteria == null)
            {
                pagingCriteria = new PagingCriteria();
                pagingCriteria.PageSize = 10;
                pagingCriteria.PageNumberToFetch = 1;
            }
            var list = new JArray();

            var orderList = _yIPL_MAContext.Order.ToList();
           
            if (!String.IsNullOrEmpty(Convert.ToString(data["From"])))
            {
                DateTime fromDate = new DateTime(DateTime.ParseExact(Convert.ToString(data["From"]), "yyyy-MM-dd", null).Year, DateTime.ParseExact(Convert.ToString(data["From"]), "yyyy-MM-dd", null).Month, DateTime.ParseExact(Convert.ToString(data["From"]), "yyyy-MM-dd", null).Day, 00, 00, 00, DateTimeKind.Utc);
                var from = new DateTime(fromDate.Year, fromDate.Month, fromDate.Day, 0, 0, 0, 0);

                orderList = orderList.Where(x => x.OrderDate >= from).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(data["To"])))
            {
                DateTime toDate = new DateTime(DateTime.ParseExact(Convert.ToString(data["To"]), "yyyy-MM-dd", null).Year, DateTime.ParseExact(Convert.ToString(data["To"]), "yyyy-MM-dd", null).Month, DateTime.ParseExact(Convert.ToString(data["To"]), "yyyy-MM-dd", null).Day, 23, 59, 59, DateTimeKind.Utc);
                var to = new DateTime(toDate.Year, toDate.Month, toDate.Day, 23, 59, 59, 999);

                orderList = orderList.Where(x => x.OrderDate <= to).ToList();
            }

            if (!String.IsNullOrEmpty(Convert.ToString(data["BuyerCode"])))
            {
                

                orderList = orderList.Where(x => x.BuyerCode == (Convert.ToString(data["BuyerCode"]))).ToList();
            }

            var query = orderList.Count;
            orderList = orderList.OrderByDescending(x => x.OrderDate).Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            
            var resultdata = new JObject();

            resultdata.Add("OrderCount", query);
            resultdata.Add("OrderList", JArray.FromObject(orderList));
            return resultdata;
        }

        public JArray GetBuyerPlantLocations(JObject data)
        {
            var result = _DBContext.RetrieveEntities<TotalStock>("SELECT DISTINCT PlantCode, SLOC FROM [dbo].[TotalStock] WITH (NOLOCK) WHERE  PlantCode in (SELECT Distinct PlantCode  FROM M_BuyerSupplier WHERE BuyerCode ='" + Convert.ToString(data["BuyerCode"]) + "') ORDER BY PlantCode, SLOC", CommandType.Text, null);
            if (result != null)
            {
                var array = new JArray();
                foreach (var res in result)
                {
                    var obj = new JObject();
                    obj.Add("PlantCode", res.PlantCode);
                    obj.Add("SLOC", res.SLOC);
                    array.Add(obj);
                }
                return array;
            }
            else
            {
                return null;
            }
        }



        public JObject GetOrderMaturity(JObject request)
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
            var result = _DBContext.RetrieveEntities<Order_Maturity_Tracking>(@"select *,(select Description from M_Items where ItemCode=o.Itemcode)  as Material_Description from Order_Maturity_Tracking o", CommandType.Text, null);
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
            if (!String.IsNullOrEmpty(Convert.ToString(request["SuppierCode"])))
            {
                result = result.Where(x => x.SupplierCode == Convert.ToString(request["SuppierCode"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["ItemCode"])))
            {
                result = result.Where(x => x.ItemCode == Convert.ToString(request["ItemCode"])).ToList();
            }

            if (!String.IsNullOrEmpty(Convert.ToString(request["Invoice"])))
            {
                result = result.Where(x => x.InvoiceNumber == Convert.ToString(request["Invoice"])).ToList();
            }
            var resultdata = new JObject();

            resultdata.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("List", JArray.FromObject(result));
            return resultdata;
            
        }

        public int UpdateOrderMaturity(JArray data)
        {
            int result=0;
            foreach (JObject item in data) 
            {
                result+= _DBContext.UpdateWithRecordsAffected(@"update Order_Maturity_Tracking set OrderMaturityDate='" + Convert.ToString(item["OrderMaturityDate"]) + "' , OrderStatus='" + Convert.ToString(item["OrderStatus"]) + "' where id=" + Convert.ToString(item["Id"]), CommandType.Text, null);
          
            } 
             return result;
        }
    }
}
