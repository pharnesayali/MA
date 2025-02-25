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
    public class GITController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private DBContext _DBContext;
        private GITService _receiptService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();

        public GITController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _receiptService = new GITService(_DBContext, _yIPL_MAContext);
        }


        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject request)
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _receiptService.Get(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Receipt List"));
            }
        }
    }
}
