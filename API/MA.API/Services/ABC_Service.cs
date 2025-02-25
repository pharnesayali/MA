using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class ABC_Service
    {
        public ABC_Repository _aBC_Repository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public ABC_Service(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _aBC_Repository = new ABC_Repository(DBContext, _yIPL_MAContext);
        }

        public JObject Get()
        {
            
            var response = new JObject();
            try
            {
                var result = _aBC_Repository.Get();
                if (result != null)
                {
                    if (result.Tables.Count != 0)
                    {
                        response.Add("Result", JObject.FromObject(result));
                        return response;
                    }
                    else
                    {
                        response.Add("Message", "No records found");
                        return response;

                    }

                }
                else
                {
                    response.Add("Message", "Error in getting ABC View");
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

