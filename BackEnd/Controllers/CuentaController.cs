using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Tarea2.Models;

namespace Tarea2.Controllers
{
    [Route("Cuenta")]
    public class CuentaController : Controller
    {
        private readonly SignInManager<Usuario> _signInManager;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ILogger<CuentaController> _logger;

        public CuentaController(
            SignInManager<Usuario> signInManager,
            UserManager<Usuario> userManager,
            RoleManager<Role> roleManager,
            ILogger<CuentaController> logger)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        // POST: /Cuenta/Login
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Modelo incorrecto" });

            var result = await _signInManager.PasswordSignInAsync(
                model.Username,
                model.Password,
                model.RememberMe,
                lockoutOnFailure: false
            );

            if (!result.Succeeded)
                return Unauthorized(new { message = "Usuario o contraseña incorrectos" });

            var user = await _userManager.FindByNameAsync(model.Username);

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                fechaRegistro = user.FechaRegistro
            });
        }

        // POST: /Cuenta/Register
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<ActionResult<string>> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new Usuario
                {
                    UserName = model.Username
                };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, "User");
                    _logger.LogInformation("Usuario {Username} se registró exitosamente.", model.Username);
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    return "Usuario registrado";
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                    return "Error al registrar";
                }
            }

            return "Error en el modelo";
        }

        // POST: /Cuenta/DeleteUser
        [HttpPost("DeleteUser")]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteUser([FromBody] int userId)
        {
            if (userId <= 0)
                return BadRequest("Debe proporcionar un ID de usuario válido.");

            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return NotFound("Usuario no encontrado.");

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                _logger.LogInformation("Usuario con ID {UserId} eliminado correctamente.", userId);
                return Ok(new { message = $"Usuario con ID {userId} eliminado correctamente." });
            }

            _logger.LogWarning("Error al eliminar el usuario con ID {UserId}.", userId);
            return BadRequest(new { message = "Error al eliminar usuario." });
        }

        // POST: /Cuenta/Logout
        [HttpPost("Logout")]
        [AllowAnonymous]
        public async Task<IActionResult> Logout([FromBody] int userId)
        {
            if (userId <= 0)
                return BadRequest(new { message = "Debe proporcionar un ID de usuario válido." });

            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return NotFound(new { message = "Usuario no encontrado." });

            await _signInManager.SignOutAsync();
            _logger.LogInformation("Usuario con ID {UserId} cerró sesión.", userId);

            return Ok(new { message = "Sesión cerrada correctamente." });
        }

        // GET: /Cuenta/Perfil/{id}
        [HttpGet("Perfil/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Perfil(int id)
        {
            if (id <= 0)
                return BadRequest(new { message = "Debe proporcionar un ID válido." });

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return NotFound(new { message = $"No se encontró un usuario con el ID {id}." });

            return Ok(new
            {
                id = user.Id,
                username = user.UserName,
                fechaRegistro = user.FechaRegistro
            });
        }
    }
}
