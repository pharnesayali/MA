using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;
using NPOI.POIFS.Crypt.Dsig;
using System.Data;

namespace MA.API.Services
{
    public class MRPService
    {
        public MRPRepository _MRPRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public MRPService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _MRPRepository = new MRPRepository(DBContext, _yIPL_MAContext);
        }

        public List<JObject> Get(JObject data)
        {

            List<JObject> response = new List<JObject>();
            var MRPList = _MRPRepository.Get(data);

            if (MRPList.Count != 0)
            {
                return MRPList;
            }
            else
            {

                return null;
            }
        }
        public JObject List(JObject data )
        {


            var response = new JObject();
            try
            {
                var result = _MRPRepository.list(data);

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
                    response.Add("Message", "Error in getting MRP data");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }

        }
        public List<JObject> GetAnalysis()
        {



            List<JObject> response = new List<JObject>();
            var MRPList = _MRPRepository.GetAnalysis();

            if (MRPList.Count != 0)
            {
                return MRPList;
            }
            else
            {

                return null;
            }

        }
    }
}
