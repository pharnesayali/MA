
using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;

namespace MA.API.Services
{

    public class ITRService
    {
        public ITRRepository _iTRRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public ITRService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _iTRRepository = new ITRRepository(DBContext, _yIPL_MAContext);
        }



        public JObject Get()
        {
            var obj = new JObject();
            try
            {

                var result = _iTRRepository.Get();

                if (result != null)
                {
                    if (result.Count > 0)
                    {

                        obj.Add("Result", JArray.FromObject(result));
                        return obj;
                    }
                    else
                    {
                        obj.Add("Result", "No records found");
                        return obj;
                    }
                }
                else
                {
                    obj.Add("Result", "No records found");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }
        public JObject Report()
        {
            var obj = new JObject();
            try
            {

                var result = _iTRRepository.Report();

                if (result != null)
                {
                    if (result.Count > 0)
                    {
                        obj.Add("Result", JArray.FromObject(result));
                        return obj;
                    }
                    else
                    {
                        obj.Add("Result", "No records found");
                        return obj;
                    }
                }
                else
                {
                    obj.Add("Result", "No records found");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }

        public JObject Get(JObject request)
        {
            var obj = new JObject();
            try
            {
                if (string.IsNullOrWhiteSpace(Convert.ToString(request["month"])) || (string.IsNullOrWhiteSpace((Convert.ToString(request["Revision"])))))
                {
                    obj.Add("Result", "Please provide Month,Revision");
                    return obj;
                }


                var result = _iTRRepository.Get(request);

                if (result != null)
                {

                    obj.Add("Result", JArray.FromObject(result));
                    return obj;

                }
                else
                {
                    obj.Add("Result", "No records found");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }
        public JObject GetRevision(JObject request)
        {
            var obj = new JObject();
            try
            {
                var result = _iTRRepository.GetRevision(request);

                if (result != null)
                {
                    if (result.Count > 0)
                    {
                        obj.Add("Result", JArray.FromObject(result));
                        return obj;

                    }
                    else
                    {
                        obj.Add("Result", "No records found");
                        return obj;
                    }
                }
                else
                {
                    obj.Add("Result", "No records found");
                    return obj;
                }
            }
            catch (Exception e)
            {
                obj.Add("Message", e.Message);
                return obj;
            }
        }
        public JObject Generate()
        {
            var response = new JObject();
            try
            {
                var result = _iTRRepository.Generate();

                if (result != null)
                {
                    if (result > 0)
                    {
                        response.Add("Result", "ITR Generated successfully!");
                        return response;
                    }
                    else
                    {
                        response.Add("Result", "ITR Generated failed!");
                        return response;
                    }
                }
                else
                {
                    response.Add("Result", "ITR Generated failed!");
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }


        public JObject Update(JArray data)
        {
            var response = new JObject();
            try
            {
                var result = _iTRRepository.Update(data);

                if (result != null)
                {
                    if (result > 0)
                    {
                        response.Add("Result", "ITR Updated successfully!");
                        return response;
                    }
                    else
                    {
                        response.Add("Result", "ITR Update failed!");
                        return response;
                    }
                }
                else
                {
                    response.Add("Result", "ITR Update failed!");
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
