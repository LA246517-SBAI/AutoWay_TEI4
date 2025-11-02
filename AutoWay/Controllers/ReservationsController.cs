using AutoWay.AutoWay.Models;
using AutoWay.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoWay.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ReservationsController : ControllerBase
    {
        private readonly AutoWayContext _context;

        public ReservationsController(AutoWayContext context)
        {
            _context = context;
        }

        // GET: Reservations
        [HttpGet]
        [Authorize(Roles = "ADMIN,STAFF")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
            var reservations = await _context.Reservations
                .Include(r => r.Utilisateur)
                .Include(r => r.Avis)
                .ToListAsync();
            return Ok(reservations);
        }

        // GET: Reservations/5
        [HttpGet("{id}")]
        [Authorize(Roles = "ADMIN,STAFF")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
            var reservation = await _context.Reservations
                .Include(r => r.Utilisateur)
                .FirstOrDefaultAsync(r => r.ReservationID == id);

            if (reservation == null)
                return NotFound(new { message = "Réservation introuvable." });

            return Ok(reservation);
        }


        // POST: Reservations
        [HttpPost]
        [Authorize(Roles = "ADMIN,STAFF,USER")]
        public async Task<ActionResult<Reservation>> CreateReservation([FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var voiture = await _context.Voiture.FindAsync(reservation.VoitureID);
            if (voiture == null)
                return BadRequest("Voiture inexistante.");

            reservation.Voiture = voiture;


            var voitureDispo = !_context.Reservations.Any(r => r.VoitureID == reservation.VoitureID &&
             ((reservation.DateDebut >= r.DateDebut && reservation.DateDebut <= r.DateFin) ||
              (reservation.DateFin >= r.DateDebut && reservation.DateFin <= r.DateFin)));

            if (!voitureDispo)
                return BadRequest("La voiture n'est pas disponible sur cette période.");


            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            // Retourne un code 201 (Created) avec l'URL de la nouvelle ressource
            return CreatedAtAction(nameof(GetReservation), new { id = reservation.ReservationID }, reservation);
        }

        // PUT: Reservations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReservation(int id, [FromBody] Reservation reservation)
        {
            if (User.IsInRole("USER") && reservation.UtilisateurID != int.Parse(User.FindFirst("id").Value))
                return Forbid();
            
            if (id != reservation.ReservationID)
                return BadRequest(new { message = "L'ID ne correspond pas." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                    return NotFound(new { message = "Réservation introuvable." });
                else
                    throw;
            }

            return NoContent(); // 204
        }

        // DELETE: Reservations/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "ADMIN,STAFF,USER")]
        public async Task<IActionResult> DeleteReservation(int id)
        {

            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
                return NotFound(new { message = "Réservation introuvable." });


            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent(); // 204
        }

        private bool ReservationExists(int id)
        {
            return _context.Reservations.Any(e => e.ReservationID == id);
        }
    }
}
