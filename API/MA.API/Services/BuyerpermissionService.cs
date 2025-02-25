using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class BuyerpermissionService
    {
        public BuyerpermissionRepository _buyerpermissionRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public BuyerpermissionService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _buyerpermissionRepository = new BuyerpermissionRepository(DBContext, _yIPL_MAContext);
        }
        public JObject List()
        {
            var response = new JObject();
            try

            {
                var result = _buyerpermissionRepository.List();
                if (result != null)
                {
                    if (result.Count > 0)
                    {
                        response.Add("Result", JArray.FromObject(result));
                        return response;
                    }
                    else
                    {
                        response.Add("Message", "No records found!");
                        return response;
                    }
                }
                else
                {
                    response.Add("Message", "No records found!");
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
