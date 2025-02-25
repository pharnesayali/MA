
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
    public class ITRController : Controller
    {
        private DBContext _DBContext;
        private ITRService _iTRService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();


        public ITRController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _iTRService = new ITRService(_DBContext, _yIPL_MAContext);
        }
       

       

        [HttpGet("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.Get();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get itr"));
            }
        }

        [HttpGet("Generate")]
        [AllowAnonymous]
        public async Task<ActionResult> Generate()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.Generate();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Generating itr"));
            }
        }


        [HttpPost("Update")]
        [AllowAnonymous]
        public async Task<ActionResult> Update([FromBody] JArray data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.Update(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Updating itr"));
            }
        }

        [HttpPost("GetRevision")]
        [AllowAnonymous]
        public async Task<ActionResult> GetRevision(JObject request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.GetRevision(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get itr"));
            }
        }

        [HttpPost("View")]
        [AllowAnonymous]
        public async Task<ActionResult> Get(JObject request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.Get(request);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get itr"));
            }
        }

        [HttpGet("Report")]
        [AllowAnonymous]
        public async Task<ActionResult> Report()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _iTRService.Report();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in itr Report "));
            }
        }

    }
}
    
