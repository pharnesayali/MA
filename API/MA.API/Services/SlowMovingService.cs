using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;
using System.Data;

namespace MA.API.Services
{
    public class SlowMovingService
    {
        public SlowMovingRepository _slowMovingRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public SlowMovingService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _slowMovingRepository = new SlowMovingRepository(DBContext, _yIPL_MAContext);
        }

        public JObject Get()
        {
            //var smon = Convert.ToString(request["smon"]);
            //var syr = Convert.ToString(request["syr"]);
            var response = new JObject();
            try
            {
                var result = _slowMovingRepository.Get();
                if (result != null)
                {
                    if (result.Count != 0)
                    {
                        response.Add("Result", JArray.FromObject(result));
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

                    response.Add("Message", "Data Not Found");
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
