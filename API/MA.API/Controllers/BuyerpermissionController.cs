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
    public class BuyerpermissionController : Controller
    {
        private DBContext _DBContext;
        private BuyerpermissionService _buyerpermissionService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();

        public BuyerpermissionController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _buyerpermissionService = new BuyerpermissionService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _buyerpermissionService.List();
                    if (response != null)
                    {
                        return Ok(response);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Geting buyers List"));
            }
        }
    }
}
