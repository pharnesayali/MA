using Microsoft.AspNetCore.Mvc;
using MA.API.ModelsView;
using MA.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net;
using MA.API.Data;
using MA.API.Models;
using MA.API.Utilities;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ABCController : Controller
    {

        private DBContext _DBContext;
        private ABC_Service _aBC_Service;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();
        public ABCController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _aBC_Service = new ABC_Service(_DBContext, _yIPL_MAContext);
        }
        [HttpGet("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            try
            {

                if (ModelState.IsValid)
                {
                    var res = _aBC_Service.Get();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get GetABCView"));
            }
        }
     
    }
}
