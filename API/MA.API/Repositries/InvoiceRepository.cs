using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using static MA.API.Models.Paging;

namespace MA.API.Repositries
{
    public class InvoiceRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public InvoiceRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public JObject Get(string invoice)
        {
            var response = new JObject();

            var result = _DBContext.RetrieveEntities<Invoice>(@"select Top  1 PONumber,InvoiceNumber,InvoiceDate,ExpectedDeliveryDate,ExpectedArrivalDateAtPort,ExpectedArrivalAtFactory from Invoice  Where InvoiceNumber='" + invoice+"'", CommandType.Text, null);
            if(result == null)
            {
                response.Add("Message", "Data not found");
                return response;
            }

            response.Add("List", JArray.FromObject(result));
            return response;
        }


        public JObject Get(JObject request)
        {

            var pagingCriteria = new PagingCriteria();
            if (request["PageCriteria"] != null)
            {
                pagingCriteria = JsonConvert.DeserializeObject<PagingCriteria>(Convert.ToString(request["PageCriteria"]));
            }
            var result = _DBContext.RetrieveEntities<InvoiceExt>
                (@"select I.*, (select BuyerCode from M_BuyerSupplier where M_BuyerSupplier.SupplierCode=I.SupplierCode) As BuyerCode,(select Description from M_Items where ItemCode=I.ItemCode) as Description
                 from Invoice I", CommandType.Text, null).ToList();

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
            if (!String.IsNullOrEmpty(Convert.ToString(request["Buyer"])))
            {
                result = result.Where(x => x.BuyerCode == Convert.ToString(request["Buyer"])).ToList();
            }
            if (!String.IsNullOrEmpty(Convert.ToString(request["Year"])))
            {
                result = result.Where(x => x.InvoiceDate.Year == Convert.ToInt32(request["Year"])).ToList();
            }

            var resultdata = new JObject();

            resultdata.Add("Count", result.Count);
            result = result.Skip((pagingCriteria.PageNumberToFetch - 1) * pagingCriteria.PageSize).Take(pagingCriteria.PageSize).ToList();
            resultdata.Add("List", JArray.FromObject(result));
            return resultdata;
        }

        public JObject Update(List<Invoice> data)
        {
            var invoices  = new List<Invoice>();

            foreach (var item in data)
            {
                var id = item.Id;
                var invoice = _yIPL_MAContext.Invoices.Find(id);
                if (invoice != null)
                {
                    invoice.InvoiceDate = item.InvoiceDate;
                    invoices.Add(invoice);
                }
            }
            try
            {
                _yIPL_MAContext.Invoices.UpdateRange(invoices);
                int result = _yIPL_MAContext.SaveChanges();
                JObject obj = new JObject();
                if (result > 0)
                {
                    var resultdata = new JObject();

                    resultdata.Add("isUpdated", true);
                    resultdata.Add("Message", "Updated " + result + " records ");
                    return resultdata;
                }
                else
                {
                    var resultdata = new JObject();
                    resultdata.Add("isUpdated", false);
                    resultdata.Add("Message", "Update Failed");
                    return resultdata;
                }
            }
            catch
            {
                throw;

            }
            
            
        }

        public bool? UpdateDate( JObject data)
        {
            try
            {
                _DBContext.Update(@"Update Invoice set ExpectedDeliveryDate='" + data["ExpectedDeliveryDate"] + "',ExpectedArrivalAtFactory='" + data["ExpectedArrivalAtFactory"] + "',ExpectedArrivalDateAtPort='" + data["ExpectedArrivalDateAtPort"] + "' where InvoiceNumber='" + data["InvoiceNumber"] + "'", CommandType.Text, null);
                
                return true;
            }
            catch
            {
                return null;
            }

        }

    }
}
