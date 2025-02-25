//using CostEstimatorAPI.Model;
using MA.API.Data;
using MA.API.Models;
using MA.API.ModelsView;
using MA.API.Services;
using MA.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System.Net;

namespace MA.API.Controllers
{
    [ApiController]

    [Route("[controller]")]
    public class StockController : Controller
    {
        private DBContext _DBContext;
        private YIPL_MAContext _yIPL_MAContext;
        StockService _stockService;
        private ILoggerManager _logger = new LoggerManager();


        public StockController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _stockService = new StockService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _stockService.List(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Stock List"));
            }
        }
    }
}
