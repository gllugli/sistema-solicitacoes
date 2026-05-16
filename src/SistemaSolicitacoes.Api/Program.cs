using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

var frontendPath = Path.Combine(
    app.Environment.ContentRootPath,
    "..",
    "SistemaSolicitacoes.Web"
);

var fileProvider = new PhysicalFileProvider(frontendPath);

app.UseDefaultFiles(new DefaultFilesOptions
{
    FileProvider = fileProvider
});

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = fileProvider
});

app.UseAuthorization();

app.MapControllers();

app.Run();