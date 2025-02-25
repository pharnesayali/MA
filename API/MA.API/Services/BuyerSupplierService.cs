using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NPOI.XSSF.UserModel;
using System.Data;

namespace MA.API.Services
{
    public class BuyerSupplierService
    {
        public BuyerSupplierRepository _buyerSupplierRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        private DBContext _DBContext;

        public BuyerSupplierService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _DBContext = DBContext;
            _yIPL_MAContext = YIPL_MAContext;
            _buyerSupplierRepository = new BuyerSupplierRepository(DBContext, _yIPL_MAContext);
        }

        public JObject List(JObject request)
        {
            var response = new JObject();
            try 
            { 
            var result = _buyerSupplierRepository.List(request);
           
                if (result != null)
                {
                    return result;
                }
                
                response.Add("Message", "Could not find the BuyerSupplier");
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }

        }
        public JObject Update()
        {
            XSSFWorkbook xssWorkbook = null;
            using (
            var stream = new FileStream("D:\\Yazaki\\BuyerSuplier.xlsx", FileMode.Open))
            {
                stream.Position = 0;
                xssWorkbook = new XSSFWorkbook(stream);

            }
            var resultdata = new JObject();
            if (xssWorkbook != null)
            {
                var sheet = xssWorkbook.GetSheetAt(0);
                var list = new List<JObject>();
                for (int i = 1; i <= sheet.LastRowNum; i++)
                {
                    var row = sheet.GetRow(i);
                    var plantcode = row.GetCell(0);
                    var SupplierCode = row.GetCell(1);
                    var BuyerId = row.GetCell(2);
                    var itemCode = row.GetCell(3);

                    var obj = new JObject();
                    obj.Add("plantcode", plantcode.ToString());
                    obj.Add("SupplierCode", SupplierCode.ToString());
                    obj.Add("BuyerId", BuyerId.ToString());
                    obj.Add("itemCode", itemCode.ToString());
                    list.Add(obj);
                }

                var result = _buyerSupplierRepository.Update(list);

                
                if (result!=null)
                {

                    return result;
                }
                else
                {
                   
                    resultdata.Add("isUpdated", false);
                    resultdata.Add("Message", "Update failed");
                    return resultdata;
                }



            }
            else
            {
                resultdata.Add("isUpdated", false);
                resultdata.Add("Message", "Could not find the file ");
                return resultdata;
            }

        }

        public DataTable GetZone()
        {
            return _buyerSupplierRepository.GetZone();
        }


        public DataTable GetPlant(JObject data)
        {
            return _buyerSupplierRepository.GetPlant(data);
        }

        public JObject GetSupplierByBuyerID(string data)
        {
            var response = new JObject();
            try
            {
                if (!string.IsNullOrEmpty(data))
                {
                    return _buyerSupplierRepository.GetSupplierByBuyerID(data);
                }
                response.Add("Message", "Please Provide BuyerId");
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }


        public JObject Add(JObject data)
        {
            JObject response = new JObject();
            try
            {
                int i = 0;

                var addBuyer = JsonConvert.DeserializeObject<List<M_BuyerSupplier>>(Convert.ToString(data["data"]));

                var dd = _DBContext.RetrieveEntities<M_BuyerSupplier>(@"DELETE FROM [dbo].[M_BuyerSupplier] WHERE BuyerCode='" + data["BuyerCode"] + "'", CommandType.Text, null);
                if (addBuyer.Count != 0)
                {
                    foreach (var buyer in addBuyer)
                    {
                        buyer.CreatedOn = DateTime.UtcNow;
                        buyer.LastModifiedOn = DateTime.UtcNow;
                        var result = _buyerSupplierRepository.Add(buyer);
                        i++;
                    }
                    
                }
                response.Add("Updated records", i);
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

    }
}
