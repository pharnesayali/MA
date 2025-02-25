using MA.API.Data;
using MA.API.Models;
using Newtonsoft.Json.Linq;
using System.Data;

namespace MA.API.Repositries
{
    public class BuyerSupplierRepository
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        public BuyerSupplierRepository(DBContext DBContextS, YIPL_MAContext yIPL_MAContext)
        {
            _DBContext = DBContextS;
            var context = default(YIPL_MAContext);
            _yIPL_MAContext = yIPL_MAContext;
        }

        public JObject List(JObject request)
        {


            var result = (from e in _yIPL_MAContext.MPlantItemSuppliers
                          join d in _yIPL_MAContext.M_BuyerSupplier on e.SupplierCode equals d.SupplierCode into result_table
                          from BuyerSupplier in result_table.DefaultIfEmpty()
                          select new
                          {
                              e,
                              BuyerSupplier.BuyerCode
                          }).ToList(); 
            
            var resultdata = new JObject();
            
            if (!String.IsNullOrEmpty(Convert.ToString(request["BuyerID"])))
            {
                result = result.Where(x => x.BuyerCode == Convert.ToString(request["BuyerID"])).ToList();
            }
            if (result.Count == 0)
            {
                resultdata.Add("Message", "No Records Found!");
                return resultdata;
            }
            resultdata.Add("List", JArray.FromObject(result));
            return resultdata;



        }

        public JObject Update(List<JObject> request)
        {
            List<M_BuyerSupplier> buyerSuppliersInsert  = new List<M_BuyerSupplier>();
            List<M_BuyerSupplier> buyerSuppliersUpdate = new List<M_BuyerSupplier>();
            foreach (JObject item in request)
            {
                
                var result = (from e in _yIPL_MAContext.MPlantItemSuppliers
                              join d in _yIPL_MAContext.M_BuyerSupplier on e.SupplierCode equals d.SupplierCode into result_table

                              from BuyerSupplier in result_table.DefaultIfEmpty()
                              select new
                              {
                                  e,
                                  BuyerSupplier.BuyerCode
                              }).Where(x => x.e.ItemCode == Convert.ToString(item["itemCode"]) && x.e.PlantCode == Convert.ToString(item["plantcode"])
                              && x.e.SupplierCode == Convert.ToString(item["SupplierCode"]) && x.BuyerCode == Convert.ToString(item["BuyerId"])
                              ).ToList();

                if (result != null)
                {
                    if (result.Count == 0)
                    {
                        var temp = new M_BuyerSupplier();
                        temp.SupplierCode = Convert.ToString(item["SupplierCode"]);
                        temp.BuyerCode = Convert.ToString(item["BuyerId"]);
                        temp.CreatedOn = DateTime.UtcNow;
                        buyerSuppliersInsert.Add(temp);
                    }
                    if (result.Count > 1)
                    {
                        var temp = new M_BuyerSupplier();
                        temp.SupplierCode = Convert.ToString(item["SupplierCode"]);
                        temp.BuyerCode = Convert.ToString(item["BuyerId"]);
                        temp.CreatedOn = DateTime.UtcNow;
                        buyerSuppliersUpdate.Add(temp);
                    }
                }
            }
            var resultdata = new JObject();

            try
                    {
                        _yIPL_MAContext.AddRange(buyerSuppliersInsert);
                       
                        
                        resultdata.Add("MessageInsert", "Insert" + buyerSuppliersInsert.Count +"records");
              
                       

                    }
                    catch(Exception e )
                    {

                       
                        resultdata.Add("MessageInsert", "Insert failed");
                        Console.WriteLine(e);
                        


                    }
                    try
                    {
                        _yIPL_MAContext.UpdateRange(buyerSuppliersUpdate);
                  

                        resultdata.Add("MessageUpdate", "Update" + buyerSuppliersUpdate.Count + "Recprds");
                     


                    }
                    catch(Exception e)
                    {


                        resultdata.Add("MessageUpdate", "Update failed");
                        Console.WriteLine(e);
                        


                    }
            _yIPL_MAContext.SaveChanges();
            return resultdata;
           
                }

        public DataTable GetZone()
        {
            try
            {

                var data = _DBContext.GetDataTable(@"select Distinct zone from M_Plant", CommandType.Text, null);
                
                return data ;

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public DataTable GetPlant(JObject data)
        {
            try
            {

                var plant = _DBContext.GetDataTable(@"select distinct PlantCode from M_Plant", CommandType.Text, null);
                if (!String.IsNullOrEmpty(Convert.ToString(data["Zone"])))
                {
                    plant = _DBContext.GetDataTable(@"select distinct PlantCode from M_Plant where zone='" + data["Zone"] + "'", CommandType.Text, null);

                }


                return plant;

            }
            catch (Exception e)
            {
                throw e;
            }
        }


        public JObject GetSupplierByBuyerID(string data)
        {
            try
            {
                var obj = new JObject();
                var res = _yIPL_MAContext.M_BuyerSupplier.Where(x => x.BuyerCode == data).FirstOrDefault();
                if(res != null)  
                {
                    var result = _DBContext.RetrieveEntities<M_BuyerSupplierDTO>(@"select MBS.SupplierCode,MBS.PlantCode,BuyerCode,(select top 1 SupplierName from M_ItemSupplier where SupplierCode=MBS.SupplierCode) AS SupplierName  from M_BuyerSupplier MBS where BuyerCode='" + data + "'", CommandType.Text, null).ToList();
                    obj.Add("Rows", JArray.FromObject(result));
                }
                else
                {
                    obj.Add("Message", "Record Doesn't Exist!");
                    return obj;
                }
                             
                
                return obj;

            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public bool Add(M_BuyerSupplier buyer)
        {           
             this._yIPL_MAContext.M_BuyerSupplier.Add(buyer);
             var i = this._yIPL_MAContext.SaveChanges();
             if (i == 1)
             {
                 return true;
             }
             else
             {
                 return false;
             }
        }  
    }
}
