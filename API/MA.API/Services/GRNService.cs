using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{
    public class GRNService
    {
        public GRNRepository _GRNRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public GRNService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _GRNRepository = new GRNRepository(DBContext, _yIPL_MAContext);
        }


        public JObject List(JObject data)
        {
            var response = new JObject();
            try
            {
                var GRNList = _GRNRepository.List(data);
                if (GRNList == null)
                {
                    response.Add("Message", "Could not Find the GRN List!");
                    return response;
                }
                var count = GRNList["GRNCount"].ToString();
                if (count != "0")
                {
                    return GRNList;
                }
                else
                {
                    response.Add("Message", "Could not Find the GRN List!");
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
