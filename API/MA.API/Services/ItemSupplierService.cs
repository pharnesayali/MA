using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class ItemSupplierService
    {
        private YIPL_MAContext _yIPL_MAContext;
        public ItemSupplierRepository _itemSupplierRepository = null;
        public ItemSupplierService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _itemSupplierRepository = new ItemSupplierRepository(DBContext, _yIPL_MAContext);
        }
        public JObject List(JObject request)
        {
            try
            {
                var result= _itemSupplierRepository.List(request);
                if (result != null)
                {
                    if (result.Count > 0)
                    {
                        return result;
                    }
                    else
                    {
                        var response = new JObject();
                        response.Add("Message", "No records Found");
                        return response;
                    }
                }
                else
                {
                    var response = new JObject();
                    response.Add("Message", "No records Found");
                    return response;
                }
            }
            catch (Exception e)
            {
                var response = new JObject();
                response.Add("Message", e.Message);
                return response;
            }
        }
        public JObject Get(JObject request)
        {
            var obj = new JObject();
            try
            {
                var plant_master = _itemSupplierRepository.Get(request);
                if (plant_master != null)
                {
                    obj.Add("result", JArray.FromObject(plant_master));
                    return obj;
                }
                else
                {
                    obj.Add("Message", "Data Not Found");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }

        public int  Update(JObject request)
        {
            return _itemSupplierRepository.Update(request);
        }

        public JObject GetByPlant(JObject data)
        {
            var response = new JObject();
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(data["plant"])))
                {
                    response.Add("Message", "Please provide the plant code");
                    return response;
                }
                var result = _itemSupplierRepository.GetByPlant(data);
                if (result != null)
                {
                    return result;
                }
                else
                {
                    response.Add("Message", "Suppliers doesn't exist!");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }

        }
    }
}
