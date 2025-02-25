
using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class ItemService
    {
        public ItemRepository _itemRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public ItemService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _itemRepository = new ItemRepository(DBContext, _yIPL_MAContext);
        }

        public JObject Get(JObject request)
        {
            try
            {
                var result = _itemRepository.Get(request);
                if (result != null)
                {
                    if (result.Count > 0)
                    {

                        return result;
                    }
                    else
                    {
                        var response = new JObject();
                        response.Add("Message", "No records found");
                        return response;
                    }
                }
                else
                {
                    var response = new JObject();
                    response.Add("Message", "Could not find the items");
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
        public JObject Delete(int id)
        {
            try
            {
                var result = _itemRepository.Delete(id);
                if (result != null)
                {
                    return result;
                }
                var response = new JObject();
                response.Add("Message", "Could not delete the item");
                return response;
            }
            catch (Exception e)
            {
                var response = new JObject();
                response.Add("Message", e.Message);
                return response;
            }
        }
    }
}
