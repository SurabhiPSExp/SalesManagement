using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sales_management.Models;
using Sales_management.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sales_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        ISalesRepo postRepository;

        public EmployeeController(ISalesRepo _p)
        {
             postRepository=_p;
        }

        [HttpGet]
        public async Task<IActionResult> GetuserById(int id)
        {
            try
            {
                var exp = await postRepository.GetuserById(id);
                if (exp == null)
                {
                    return NotFound();
                }
                return Ok(exp);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        [HttpGet]
       
        public async Task<IActionResult> GetEmployeeDetails()
        {
            try
            {
                var exp = await postRepository.GetEmployeeDetails();
                if (exp == null)
                {
                    return NotFound();
                }
                return Ok(exp);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }
        #region Add employee

        [HttpPost]
        public async Task<IActionResult> AddEmployee(Employee employee)
        {
            //check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    var postId = await postRepository.AddEmployee(employee);
                    if (postId != null)
                    {
                        return Ok(postId);
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        #endregion
        #region Update Employee
        [HttpPut]
        
        public async Task<IActionResult> UpdateEmployee(Employee employee)
        {
            //Check the validation of body
            if (ModelState.IsValid)
            {
                try
                {
                    await postRepository.UpdateEmployee(employee);
                    return Ok(employee);
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }
        #endregion

    }
}
