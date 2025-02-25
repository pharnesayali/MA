using MA.API.Data;
using MA.API.Models;
using MA.API.ModelsView;
using MA.API.Services;
using MA.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SlowMovingController : Controller
    {

        private DBContext _DBContext;
        private SlowMovingService _slowMovingService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();
        public SlowMovingController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _slowMovingService = new SlowMovingService(_DBContext, _yIPL_MAContext);
        }
        [HttpGet("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _slowMovingService.Get();
                    if (res != null)
                    {
                        _logger.LogInfo("Got result slow moving");
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get SlowMoving"));
            }
        }

    }
}
