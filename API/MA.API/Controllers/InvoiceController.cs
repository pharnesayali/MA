using Microsoft.AspNetCore.Mvc;
using MA.API.Data;
using MA.API.Models;
using MA.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using MA.API.ModelsView;
using System.Net;
using MA.API.Utilities;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class InvoiceController : Controller
    {

       
        private DBContext _DBContext;
        private InvoiceService _invoiceService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();


        public InvoiceController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _invoiceService = new InvoiceService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("GetList")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _invoiceService.Get(request);
                    if (res != null)
                    {
                        
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in list Invoices"));
            }
        }

        [HttpPost("Update")]
        [AllowAnonymous]
        public async Task<ActionResult> Update([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _invoiceService.Update(request);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in update invoice"));
            }
        }


        [HttpPost("GetByInvoice")]
        [AllowAnonymous]
        public async Task<ActionResult> Get(string invoice)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _invoiceService.Get(invoice);
                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Ok(new ApiResponse(HttpStatusCode.NotFound, "Data not found"));
                    }
                }
                else
                {
                    return BadRequest(new ApiBadRequestResponse(ModelState));
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in getting invoice"));
            }
        }
    
    [HttpPost("UpdateDate")]
    [AllowAnonymous]
    public async Task<ActionResult> UpdateDate([FromBody] JObject request)
    {
        try
        {

            if (ModelState.IsValid)
            {
                var res = _invoiceService.UpdateDate(request);
                if (res != null)
                {
                    return Ok(res);
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest(new ApiBadRequestResponse(ModelState));
            }

        }
        catch (Exception ex)
        {
            
            _logger.LogError(ex.Message);
            return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Invoice List"));
        }
    }

}
}
