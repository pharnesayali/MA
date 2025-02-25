
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
    public class UserController : Controller
    {
        private DBContext _DBContext;
        private UserService _userService;
        private YIPL_MAContext _yIPL_MAContext;
        private ILoggerManager _logger = new LoggerManager();


        public UserController(DBContext DBContext, YIPL_MAContext YIPL_MAContext)
        {
            _yIPL_MAContext = YIPL_MAContext;
            _DBContext = DBContext;
            _userService = new UserService(_DBContext, _yIPL_MAContext);
        }
        public IActionResult Index()
        {
            return View();
        }

        // Getting user by EnployeeCode

        [HttpPost("Get")]
        [AllowAnonymous]
        public async Task<ActionResult> Get([FromBody] JObject data) 
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.Get(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get user"));
            }
        }


        // Getting all users list 
        [HttpGet("List")]
        [AllowAnonymous]
        public async Task<ActionResult> List()  
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.List();
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get Users List"));
            }
        }


        // Getting users list based on RoleCode
        [HttpPost("RoleCodeList")]
        [AllowAnonymous]
        public async Task<ActionResult> RoleCodeList([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.RoleCodeList(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Get RoleCodeList"));
            }
        }



        // Update users RoleCode
        [HttpPost("Update")]
        [AllowAnonymous]
        public async Task<ActionResult> Update([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.Update(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in update RoleCode"));
            }

        }



        // Update users IsActive
        [HttpPost("UpdateUser")]
        [AllowAnonymous]
        public async Task<ActionResult> UpdateUser([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.UpdateUser(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in update user"));
            }

        }


        // Add users 
        [HttpPost("Add")]
        [AllowAnonymous]
        public async Task<ActionResult> Add([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.Add(data);
                    if (response != null)
                    {
                        return Ok(response);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in add user"));
            }
        }


        [HttpPost("GetUser")]
        [AllowAnonymous]
        public async Task<ActionResult> GetUser([FromBody] JObject data)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var response = _userService.GetUser(data);
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
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in get user"));
            }
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login(String EmployeeCode)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var res = _userService.Login(EmployeeCode);
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
                {

                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest(new ApiResponse(HttpStatusCode.NotFound, $"Error in Login"));
            }
        }
    }
}
