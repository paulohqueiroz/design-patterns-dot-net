using Domain;
using MediatR;
using Persitence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Actitivities
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }

        }


        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken ct)
            {


                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new Exception("Could not be found");
                }

                activity.Title = request.Title ?? request.Title;
                activity.Description = request.Description ?? request.Description;
                activity.Category = request.Category ?? request.Category;
                //TODO
                activity.Date = request.Date;
                activity.City = request.City ?? request.City;
                activity.Venue = request.Venue ?? request.Venue;

                var success = await _context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Unit.Value;
                }

                throw new Exception("Problem saving...");


            }

        }
    }
}
