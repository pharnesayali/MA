using MA.API.Data;
using MA.API.Models;
using MA.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MA.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BuyerController : Controller
    {
        private DBContext _DBContext;
        private BuyerService _buyerService;
        private YIPL_MAContext _yIPL_MAContext;
        public BuyerController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _buyerService = new BuyerService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet("GetGrn")]
        [AllowAnonymous]
        public async Task<ActionResult> GetGrn()  // GatepassLineitemsViewModel gatepassLineitemsViewModel
        {
            try
            {

                //if (ModelState.IsValid)
                //{
                    var res = _buyerService.GetGrnList();
                return Ok(res);
                //}
                //else
                //{
                //    return BadRequest(new ApiBadRequestResponse(ModelState));
                //}
            }
            catch (Exception ex)
            {
                throw ex;
                //_logger.LogError(ex.Message, nameof(GetPlantCodes));
                //return BadRequest(new ApiResponse(404, $"Error in Company & User Details"));
            }
        }
    }
}
