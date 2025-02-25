using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class GITService
    {
        public GITRepository _GITRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public GITService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _GITRepository = new GITRepository(DBContext, _yIPL_MAContext);
        }

        public JObject Get(JObject request)
        {
            var response = new JObject();
            try
            {
                var result = _GITRepository.Get(request);
                if (result != null)
                {
                    return result;
                }

                response.Add("Message", "Could not find the Receipt/s");
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
