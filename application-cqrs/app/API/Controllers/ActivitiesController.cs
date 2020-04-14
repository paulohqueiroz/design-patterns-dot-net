using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Persitence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {

        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        
        }

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await _mediator.Send(new Application.Actitivities.List.Query());

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Application.Actitivities.Details.Query{ Id = id });

        }

        //frombody - se não usar ApiController, pra usar as propriedades desse request
        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody]Application.Actitivities.Create.Command command) 
        {
            return await _mediator.Send(command);        
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, [FromBody]Application.Actitivities.Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }


    }
}