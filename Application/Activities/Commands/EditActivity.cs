using System;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken: cancellationToken) ?? throw new Exception("Could not find activity");


            mapper.Map(request.Activity, activity, opt => opt.BeforeMap((src, dest) => src.Date = src.Date.ToUniversalTime()));


            await context.SaveChangesAsync(cancellationToken);
        }
    }

}
