using AutoWay.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AutoWay.Services
{
    public class AuthorizationService
    {
        // Il y a une clée privée dans le fichier "PrivateKeyTest.ini" mais il faut implémenter la lecture de ce fichier
        private string privateKey = "b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW\r\nQyNTUxOQAAACBAAHuj4EY5BCrJoIbne/CYhXWH4YWKYa/qszDMqa/v/QAAAJhsq4IObKuC\r\nDgAAAAtzc2gtZWQyNTUxOQAAACBAAHuj4EY5BCrJoIbne/CYhXWH4YWKYa/qszDMqa/v/Q\r\nAAAEBspyNsIv6CezOEUbcDXN3W6Wp6OcukwhnFfoTXNyXHA0AAe6PgRjkEKsmghud78JiF\r\ndYfhhYphr+qzMMypr+/9AAAADmJickBiYnItdWJ1bnR1AQIDBAUGBw==";

        public string CreateToken(Utilisateur user)
        {
            var handler = new JwtSecurityTokenHandler();

            var privateKeyUTF8 = Encoding.UTF8.GetBytes(privateKey);

            var credentials = new SigningCredentials(new SymmetricSecurityKey(privateKeyUTF8),
                                                      SecurityAlgorithms.HmacSha256);

            var tokenDescription = new SecurityTokenDescriptor
            {
                SigningCredentials = credentials,
                Expires = DateTime.UtcNow.AddMinutes(5),
                Subject = GenerateClaims(user)
            };

            var token = handler.CreateToken(tokenDescription);

            return handler.WriteToken(token);
        }

        private ClaimsIdentity GenerateClaims(Utilisateur user)
        {
            var Claims = new ClaimsIdentity();

            Claims.AddClaim(new Claim(ClaimTypes.Name, user.Nom));
            Claims.AddClaim(new Claim(ClaimTypes.Email, user.Email));
            // Je ne sais pas s'il faut ajouter le username si l'utilisateur n'est pas défini par un username mais plutot par une adresse email (avec nom/prenom)
            //Claims.AddClaim(new Claim("username", user.Prenom)); 
            Claims.AddClaim(new Claim("id", user.UtilisateurID.ToString()));

            // Ajout des rôles s’ils existent
            if (user.Roles != null)
            {
                foreach (var role in user.Roles)
                {
                    Claims.AddClaim(new Claim(ClaimTypes.Role, role));
                }
            }

            return Claims;
        }

        public bool IsTokenValid(string token, string role)
        {
            token = token.Replace("Bearer", "").Trim();
            var handler = new JwtSecurityTokenHandler();
            var param = new TokenValidationParameters();
            param.ValidateIssuer = false;
            param.ValidateAudience = false;
            param.ValidateLifetime = true;
            param.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(privateKey));

            SecurityToken securityToken;
            try
            {
                var claims = handler.ValidateToken(token, param, out securityToken);

                if (role != null)
                {
                    return claims.IsInRole(role);
                }
                else
                {
                    return true;
                }
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
