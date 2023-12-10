import { useState } from "react";
import { useAuth } from "../../Context/authContext";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const { singup } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await singup(user.email, user.password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      if (!user.email || !user.password) {
        setError('Por favor, completa todos los campos')
      }
        else if (error.code === 'auth/invalid-email') {
        setError('Correo electrónico inválido');
      } else if (error.code === 'auth/user-disabled') {
        setError('La cuenta de usuario ha sido deshabilitada');
      } else if (error.code === 'auth/user-not-found') {
        setError('Usuario no encontrado');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña es demasiado débil');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('El correo electrónico ya está en uso');
      } else if (error.code === 'auth/internal-error') {
        setError('Error interno de autenticación');
      } else {
        setError('Error al registrarse');
      }
      //setError(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Correo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Correo"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              className="mb-4 md:mb-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
            <p className="text-sm" style={{ paddingLeft: '20px'}}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/sign-in" className="text-blue-500 font-semibold hover:text-blue-700" style={{ paddingLeft: '20px'}}>
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Register