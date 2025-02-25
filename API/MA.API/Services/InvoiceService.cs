using MA.API.Data;
using MA.API.Models;
using MA.API.Repositries;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;

namespace MA.API.Services
{
    public class InvoiceService
    {
        public InvoiceRepository _invoiceRepository = null;
        private YIPL_MAContext _yIPL_MAContext;
        public InvoiceService(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _invoiceRepository = new InvoiceRepository(DBContext, _yIPL_MAContext);
        }
        public JObject Get(JObject request)
        {
            var response = new JObject();
            try
            {
                var result = _invoiceRepository.Get(request);
                if (result != null)
                {
                    return result;
                }

                response.Add("Message", "Could not find the Invoices ");
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }
        public JObject Get(string invoice)
        {
            var response = new JObject();
            try
            {
                var result = _invoiceRepository.Get(invoice);
                if (result != null)
                {
                    return result;
                }

                response.Add("Message", "Could not find the Invoices ");
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }
        public JObject Update(JObject request)
        {
            var response = new JObject();
            try
            {
                var data = JsonConvert.DeserializeObject<List<Invoice>>(Convert.ToString(request["data"]));
                var result = _invoiceRepository.Update(data);
                if (result != null)
                {
                    return result;
                }

                response.Add("Message", "Could not Upadate invoice");
                return response;
            }
            catch (Exception e)
            {
                response.Add("Message", e.Message);
                return response;
            }
        }

        public JObject UpdateDate(JObject request)
        {
            var response = new JObject();
            try
            {
                var result = _invoiceRepository.UpdateDate(request);
                if (result != null)
                {
                    response.Add("Message", "Upadated invoice");
                    return response;
                }


                response.Add("Message", "Could not Upadate invoice");
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
