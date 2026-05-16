using Microsoft.AspNetCore.Mvc;
using SistemaSolicitacoes.Api.Models;

namespace SistemaSolicitacoes.Api.Controllers;


[ApiController]
[Route("solicitacoes")]
public class SolicitacoesController : ControllerBase
{
    private static List<Solicitacao> solicitacoes = [];

    [HttpGet]
    public ActionResult<List<Solicitacao>> Listar()
    {
        return Ok(solicitacoes);
    }
    
    [HttpPost]
    public ActionResult<Solicitacao> Criar(Solicitacao novaSolicitacao)
    {
        // Validação do Título e do status
        if (string.IsNullOrWhiteSpace(novaSolicitacao.Titulo) || string.IsNullOrWhiteSpace(novaSolicitacao.Status))
        {
            return BadRequest("Título e status são obrigatórios.");
        }
        
        novaSolicitacao.Id = solicitacoes.Count + 1;
        solicitacoes.Add(novaSolicitacao);
        return Ok(novaSolicitacao);
    }

    [HttpPut("{id}")]
    public ActionResult<Solicitacao> AtualizarStatus(int id, Solicitacao solicitacaoAtualizada)
    {
        var solicitacao = solicitacoes.FirstOrDefault(s => s.Id == id);
        
        // Caso o .FirstOrDefault não encontre nada, solicitacao fica null
        if (solicitacao == null)
        {
            return NotFound("Solicitação não encontrada.");
        }
        
        //Se o novo status estiver vazio, retorna um BadRequest
        if (string.IsNullOrWhiteSpace(solicitacaoAtualizada.Status))
        {
            return BadRequest("Status é obrigatório.");
        }
        
        solicitacao.Status = solicitacaoAtualizada.Status;
        
        return Ok(solicitacao);
    }
}