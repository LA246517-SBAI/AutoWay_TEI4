using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AutoWay.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AutoWayContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("AutoWayContext")
        ?? throw new InvalidOperationException("Connection string 'AutoWayContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
