
using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json.Linq;
public class MasterService
{
    public MasterRepository _masterRepository = null;
    private YIPL_MAContext _yIPL_MAContext;
    public MasterService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
    {
        _yIPL_MAContext = YIPL_MAContext;
        _masterRepository = new MasterRepository(DBContext, _yIPL_MAContext);
    }

    public JObject GetPlantList()
    {
        var obj = new JObject();
        try
        {
            var result = _masterRepository.List();

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
    public JObject GetMovementType()
    {
        var obj = new JObject();
        try
        {
            var result = _masterRepository.GetMovementType();

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
    public JObject GetWeekDate()
    {
        var obj = new JObject();
        try
        {
            var result = _masterRepository.GetWeekDate();

            if (result != null)
            {
                obj.Add("Result", JArray.FromObject(result));
                return obj;
            }
            else
            {
                obj.Add("Result", "No Data Found");
                return obj;
            }
        }
        catch (Exception e)
        {
            obj.Add("Message", e.Message);
            return obj;
        }
    }

        public JObject GetConsumptionReport(JObject request)
        {
            var response = new JObject();
        try
        {
            if (String.IsNullOrWhiteSpace(Convert.ToString(request["StartDate"])) || (String.IsNullOrWhiteSpace(Convert.ToString(request["EndDate"]))))
            {

                response.Add("Message", "Start date and End date are mandatory");
                return response;

            }
            var result = _masterRepository.GetConsumptionReport(request);

            if (result != null)
            {
                if (result.Count != 0)
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
                response.Add("Message", "Consumption report not found");
                return response;
            }
        }
        catch (Exception e)
        {
            response.Add("Message", e.Message);
            return response;
        }
    }


    public JObject GetCompleteFiles()
    {
        var response = new JObject();
        try
        {
            var result = _masterRepository.GetCompleteFiles();

            if (result != null)
            {

                response.Add("Result", JObject.FromObject(result));

                return response;

            }
            else
            {
                response.Add("Message", "No records Found!");
                return response;
            }
        }
        catch (Exception e)
        {
            response.Add("Message", e.Message);
            return response;
        }
    }

    public JObject GetDailyshipment(JObject request)
    {
        var response = new JObject();
        try
        {
            var result = _masterRepository.GetDailyshipment(request);

            if (result != null)
            {

                return result;

            }
            else
            {
                response.Add("Message", "No records Found!");
                return response;
            }
        }
        catch (Exception e)
        {
            response.Add("Message", e.Message);
            return response;
        }
    }

    public JObject GetInventoryCorrection(JObject request)
    {
        var response = new JObject();
        try
        {
            if (String.IsNullOrWhiteSpace(Convert.ToString(request["StartDate"])) || (String.IsNullOrWhiteSpace(Convert.ToString(request["EndDate"]))))
            {

                response.Add("Message", "Start date and End date are mandatory");
                return response;

            }

            var result = _masterRepository.GetInventoryCorrection(request);

            if (result != null)
            {

                return result;

            }
            else
            {
                response.Add("Message", "No records Found!");
                return response;
            }
        }
        catch (Exception e)
        {
            response.Add("Message", e.Message);
            return response;
        }
    }

    public JObject GetCurrentWeekDate()
    {
        var obj = new JObject();
        try
        {
            var result = _masterRepository.GetCurrentWeekDate();

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

}


