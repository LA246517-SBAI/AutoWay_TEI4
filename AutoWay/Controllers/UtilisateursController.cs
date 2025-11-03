using AutoWay.Data;
using AutoWay.Models;
using AutoWay.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace AutoWay.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class UtilisateursController : ControllerBase
    {
        private readonly AutoWayContext _context;
        private readonly AuthorizationService _authService;

        public UtilisateursController(AutoWayContext context, AuthorizationService authService)
        {
            _context = context;
            _authService = authService;
        }

        // GET: api/Utilisateurs
        [HttpGet]
        [Authorize(Roles = "ADMIN,STAFF")]
        public async Task<ActionResult<IEnumerable<Utilisateur>>> GetUtilisateur()
        {
            return await _context.Utilisateur.ToListAsync();
        }

        // GET: api/Utilisateurs/5
        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN,STAFF")]
        public async Task<ActionResult<Utilisateur>> GetUtilisateur(int id)
        {
            var utilisateur = await _context.Utilisateur.FindAsync(id);

            if (utilisateur == null)
            {
                return NotFound();
            }

            return utilisateur;
        }

        private bool UserExists(int id)
        {
            return _context.Utilisateur.Any(e => e.UtilisateurID == id);
        }

        // PUT: api/Utilisateurs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "ADMIN,STAFF")]
        public async Task<IActionResult> PutUtilisateur(int id, Utilisateur utilisateur)
        {
            if (id != utilisateur.UtilisateurID)
            {
                return BadRequest();
            }

            _context.Entry(utilisateur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Utilisateurs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Utilisateur>> PostUtilisateur(Utilisateur utilisateur)
        {
            /*
            if (utilisateur.Roles.Contains("ADMIN") && !User.IsInRole("ADMIN"))
            {
                return Forbid();
            }
            */

            // Hash Password of new user before persist it 
            if (utilisateur.Password != null)
            {
                var salt = BCrypt.Net.BCrypt.GenerateSalt();
                utilisateur.Password = BCrypt.Net.BCrypt.HashPassword(utilisateur.Password, salt);
            }

            _context.Utilisateur.Add(utilisateur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUtilisateur", new { id = utilisateur.UtilisateurID }, utilisateur);
        }

        // DELETE: api/Utilisateurs/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> DeleteUtilisateur(int id)
        {
            var utilisateur = await _context.Utilisateur.FindAsync(id);
            if (utilisateur == null)
            {
                return NotFound();
            }

            _context.Utilisateur.Remove(utilisateur);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [AllowAnonymous]
        [HttpPost("/login")]
        public async Task<ActionResult> Login([FromForm] string email, [FromForm] string password)
        {
            var userExists = VerifierUserPassword(email, password);
            if (userExists == null)
            {
                return BadRequest();
            }

            var token = _authService.CreateToken(userExists);

            return Ok(new
            {
                token,
                expiration = DateTime.UtcNow.AddMinutes(30)
            });
        }

        private Utilisateur VerifierUserPassword(string email, string password)
        {
            var user = _context.Utilisateur.First(u => u.Email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }

            return null;
        }
    }
}
